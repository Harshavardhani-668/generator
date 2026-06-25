export default async function handler(req, res) {
  // Inject CORS headers to allow connection from the frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history, systemInstruction, responseMimeType } = req.body;

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API Key is not configured in environment variables." });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    // Map conversation logs to Gemini layout array
    const contentsPayload = (history || []).map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const bodyPayload = {
      contents: contentsPayload
    };

    if (systemInstruction) {
      bodyPayload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    if (responseMimeType) {
      bodyPayload.generationConfig = {
        responseMimeType: responseMimeType
      };
    }

    // Forward request to Google's AI Studio endpoint
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `Gemini API Error: ${errorText}` });
    }

    const data = await response.json();
    
    let aiReply = "";
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      aiReply = data.candidates[0].content.parts[0].text;
    } else {
      aiReply = "Error: Did not receive a valid text response from Gemini.";
    }

    return res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(500).json({ error: "Proxy Server Error: " + error.message });
  }
}
