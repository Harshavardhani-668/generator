const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// 1. Expose Supabase config endpoint
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
  });
});

// 2. Expose Gemini API proxy endpoint
app.post('/api/proxy', async (req, res) => {
  try {
    const { history, systemInstruction, responseMimeType } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured in .env file." });
    }

    // Call Gemini 2.5 Flash as verified
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

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
    console.error("Local Proxy Error:", error);
    return res.status(500).json({ error: "Proxy Server Error: " + error.message });
  }
});

// Serve static frontend assets from root directory
app.use(express.static(__dirname));

// Catch-all middleware for client routing (uses app.use instead of app.get('*') to avoid path-to-regexp v10 wildcard issues)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\x1b[32m[Atoms SLA Generator] Local server running at http://localhost:${PORT}\x1b[0m`);
  console.log(`Press Ctrl+C to stop.`);
});
