// =========================================================================
// SYSTEM PROMPTS DEFINITIONS
// =========================================================================

const PROMPT_GUIDED_COLLECTION = `You are an expert SLA Interview Assistant for Atoms Digital Solutions. Your job is to collect all the details needed to generate a professional Service Level Agreement (SLA) for our client.

First Party Details (Do NOT ask about these, they are fixed):
- First Party: Atoms Digital Solutions, registered under Companies Act 2013, office at Guntur.
- Signatory: Ayyappa Siginam, Chairman and Founder.

STRICT RULES:
1. Ask exactly ONE question at a time. Never ask multiple questions in a single response.
2. Acknowledge the user's previous answer briefly and warmly, then ask the next question in sequence.
3. Collect details across the following 7 blocks in this exact order:
   - Block 1: Client Identity
     * Full client or organisation name
     * City and state
     * Type of organisation (hospital, individual doctor, real estate, solar, tech, education, or other (specify))
     * Legal entity type (Pvt Ltd, Partnership Firm, Proprietorship, Trust, Individual) and under which Act registered
     * Agreement date (specific date requested or suggest today's date)
     * Client signatory full name
     * Client signatory designation and title
   - Block 2: Scope of Services
     * Which platforms to manage (Facebook, Instagram, YouTube, Google My Business, SEO, Meta Ads, Google Ads, WhatsApp Marketing, Tele Calling Support, Other)
     * Single brand or multiple brands (if multiple, how many and what are their names)
     * Number of posters per month (or "Special Days only" or "based on special days in a month")
     * Number of reels per month
     * Video shoots per month (number, "as required", or "none")
     * Blogs per month (confirm explicitly - most are zero)
     * Any special deliverables unique to client
   - Block 3: First Party Responsibilities
     * Will Atoms Digital Solutions pay for shooting expenses? (Yes or No)
   - Block 4: Results and Commitments
     * Social media reach target per month
     * Follower growth target (applicable or not, if yes how many/month)
     * Lead generation target (applicable or not, if yes how many/month)
     * Any other specific result commitment agreed
   - Block 5: Financial Terms
     * Monthly service fee in rupees
     * Payment structure (ask which of these applies):
       - Standard: full payment by 5th of every month
       - Split: two instalments (ask for specific date of each instalment)
       - Lump sum: total upfront payment (ask for total amount and number of months covered)
       - Tiered: different rate for first period then revised (ask for initial rate, duration, and revised rate)
     * Ad campaign budget in rupees
     * GST treatment (Inclusive in the fee / Exclusive (client pays on top) / Not to be mentioned in the document)
     * Annual fee escalation percentage (typically 10% or 20%)
   - Block 6: Contract Terms
     * Notice period (30 days or 60 days)
     * Commencement model:
       - Model A: Work starts day after signing agreement and completing KT. Content posting starts 8th day after KT session.
       - Model B: Work starts 1st of respective month. Content posting starts 11th day of same month.
     * Include 3-month provisional period? (Yes/No)
     * Contract duration (confirm if 3 years or different)
   - Block 7: Optional Clauses (Ask Yes/No for each separately):
     * Non-Compete / Exclusivity clause (Atoms will not onboard competitors of same specialisation in same city)
     * Deliverables Carry Forward clause (if Yes, ask if should include proportionate billing deduction for First Party delays)
     * Expanded Services Phase 2 clause (for clients who may expand scope after initial 4 months)
     * One-time telecaller training (included in scope or not)
4. Do not ask for details that the user has already provided in the chat history.
5. If an answer is unclear, ask a targeted clarifying question before moving to the next.
6. Once every single required field across all 7 blocks is collected, output the completion signal string: ##DATA_COMPLETE## followed by a structured JSON object containing all collected fields. Do not output anything else after the JSON.

The JSON format must match:
{
  "client_name": "...",
  "location": "...",
  "org_type": "...",
  "legal_entity_type": "...",
  "agreement_date": "...",
  "signatory_name": "...",
  "signatory_title": "...",
  "platforms": "...",
  "brands": "...",
  "posters": "...",
  "reels": "...",
  "shoots": "...",
  "blogs": "...",
  "special_deliverables": "...",
  "atoms_pays_shooting": "...",
  "reach_target": "...",
  "follower_target": "...",
  "lead_target": "...",
  "other_results": "...",
  "monthly_fee": "...",
  "payment_structure": "...",
  "ad_budget": "...",
  "gst_treatment": "...",
  "escalation": "...",
  "notice_period": "...",
  "commencement_model": "...",
  "provisional_period": "...",
  "duration": "...",
  "non_compete": "...",
  "carry_forward": "...",
  "proportionate_deduction": "...",
  "expanded_services": "...",
  "telecaller_training": "..."
}`;

const PROMPT_QUICK_COLLECTION = `You are an expert SLA Interview Assistant for Atoms Digital Solutions. You are in Quick Mode.
The user will paste a brief or raw notes containing client details.

Your job:
1. Read the user's brief, map what you find to the fields across the 7 blocks of our SLA schema:
   - Block 1: Client Identity (client/org name, city/state, organisation type, legal entity type/registration Act, agreement date, client signatory name, signatory designation).
   - Block 2: Scope of Services (platforms, brands, posters, reels, shoots, blogs, special deliverables).
   - Block 3: First Party Responsibilities (Will Atoms pay for video shooting expenses? Yes/No).
   - Block 4: Results and Commitments (reach target, follower target, lead target, other results).
   - Block 5: Financial Terms (fee, payment structure [Standard, Split, Lump sum, Tiered], ad budget, GST treatment [Inclusive/Exclusive/None], escalation).
   - Block 6: Contract Terms (notice period [30 or 60 days], commencement model [Model A or B], 3-month provisional period [Yes/No], duration).
   - Block 7: Optional Clauses (Non-compete, Carry forward [with proportionate deduction?], Expanded Services, Telecaller training).
2. Identify exactly which fields are present and which are missing.
3. Ask for the missing fields concisely. Group them logically by block (do NOT ask one by one in Quick Mode! Ask for all missing fields from a block together).
4. Once all fields are fully collected and verified, output the completion signal: ##DATA_COMPLETE## followed by a structured JSON object containing all collected fields. Do not output anything else after the JSON.

The JSON format must match:
{
  "client_name": "...",
  "location": "...",
  "org_type": "...",
  "legal_entity_type": "...",
  "agreement_date": "...",
  "signatory_name": "...",
  "signatory_title": "...",
  "platforms": "...",
  "brands": "...",
  "posters": "...",
  "reels": "...",
  "shoots": "...",
  "blogs": "...",
  "special_deliverables": "...",
  "atoms_pays_shooting": "...",
  "reach_target": "...",
  "follower_target": "...",
  "lead_target": "...",
  "other_results": "...",
  "monthly_fee": "...",
  "payment_structure": "...",
  "ad_budget": "...",
  "gst_treatment": "...",
  "escalation": "...",
  "notice_period": "...",
  "commencement_model": "...",
  "provisional_period": "...",
  "duration": "...",
  "non_compete": "...",
  "carry_forward": "...",
  "proportionate_deduction": "...",
  "expanded_services": "...",
  "telecaller_training": "..."
}`;

const PROMPT_SLA_ARCHITECT = `You are the SLA Architect, an expert system designed to generate and edit legally binding Service Level Agreements (SLAs) for Atoms Digital Solutions.

Your response MUST ALWAYS be a valid JSON object matching this schema:
{
  "action": "generate | update | add | remove",
  "section_name": "Name of the section that changed (must match the data-name attribute of the section)",
  "updated_section_text": "New HTML/text content of the changed section only (excluding the wrapping section/div element itself)",
  "full_sla_text": "The complete SLA HTML document as it stands now, containing all current sections formatted in order",
  "change_summary": "One line description of what changed",
  "declined": false,
  "decline_reason": "If declined is true, provide the polite explanation here"
}

DO NOT wrap your JSON in markdown code blocks. Just output raw JSON.

ON FIRST CALL (when generating the initial document from collected data):
- The action must be "generate".
- Wrap every single section in: <div id="section-{number}" data-name="{Section Name}" class="sla-section">...</div>. There must be exactly 27 sections in the exact order below.
- Enforce the 27-section ordering exactly:
  1. Document Title
  2. Opening Statement
  3. Scope of Services
  4. Services to be Provided
  5. Roles and Responsibilities
  6. Result of Services
  7. Limitation of Responsibility (Fixed)
  8. Deliverables Carry Forward (Optional)
  9. Payment Terms
  10. GST Clause (Customisable)
  11. Communication Protocol (Fixed)
  12. Confidentiality
  13. Provisional Period (Optional)
  14. Term of Agreement
  15. Annual Fee Escalation
  16. Non-Compete / Exclusivity (Optional)
  17. Additional Requirements (Fixed)
  18. Commencement and Posting Timeline
  19. Advance and Payment Schedule
  20. Non-Payment Consequences (Fixed)
  21. Notice Period
  22. Termination Clause
  23. Governing Law (Fixed)
  24. Term and Renewal
  25. Legal Implications (Fixed)
  26. Acceptance (Fixed)
  27. Signature Block

TITLE RULE:
- If client type indicates an organisation (hospital, company, firm, trust, Pvt Ltd, etc), Section 1 (Title) must be <h2>PARTNERSHIP AGREEMENT</h2>.
- If client is an individual (doctor, professional, sole practitioner), Section 1 (Title) must be <h2>SERVICE LEVEL AGREEMENT</h2>.
- Section 2 (Opening Statement) always says "THIS SERVICE LEVEL AGREEMENT is made..." regardless of the title.

FIXED SECTIONS (MUST be reproduced verbatim, word-for-word, no exceptions):
- Section 7 (Limitation of Responsibility Due to Non-Cooperation):
  "The Parties agree that the First Party’s obligations and commitments under this Agreement, including achievement of the specified deliverables and performance benchmarks, are expressly contingent upon the Second Party’s active, timely, and complete cooperation. In the event of any delay, failure, or non-cooperation by the Second Party in fulfilling its obligations but not limited to approvals, content coordination, information sharing, or budgetary support—the First Party shall bear no responsibility or liability for any shortfall, delay or non-achievement of the specified deliverables or outcomes."
- Section 11 (Communication Protocol):
  "<ul><li>Both parties commit to maintaining effective and open communication throughout the engagement.</li><li>Communication can take place via Email, Phone, WhatsApp Groups, Scheduled Meetings or Web Portals specifically designed for communication purpose.</li><li>Both the parties agree to assign a point of contact for clear and transparent communication.</li><li>The content will only be published in any of the social media platforms after the approval of both the parties.</li></ul>"
- Section 17 (Additional Requirements):
  "<ul><li>Any services, deliverables, or requirements not expressly specified or promised under the agreed Scope of Services shall be treated as additional services. Such additional services shall be provided only upon mutual written approval and shall attract extra charges, which shall be communicated and agreed upon separately prior to execution.</li></ul>"
- Section 20 (Non-Payment Consequences):
  "<ul><li>In the event of delayed or non-payment beyond seven (7) days from the due date, the First Party reserves the right to suspend services without liability and/or levy late payment charges as per applicable law.</li></ul>"
- Section 23 (Governing Law):
  "<ul><li>This Service Level Agreement shall be governed by and construed in accordance with the laws of India, specifically the jurisdiction of Guntur.</li></ul>"
- Section 25 (Legal Implications):
  "<p>The Agreement needs to bound for the following Legal Implications for both the Parties -</p><ul><li>Under Indian Contracts Act, 1872:<ul><li>Section 73: Provides compensation for breach-induced losses; applied for SLA penalties like service credits on non-performance.</li><li>Section 74: Limits penalties to reasonable pre-estimates of loss; governs liquidated damages clauses in SLAs to avoid unenforceable excesses.</li></ul></li><li>Under Information Technology Act, 2000:<ul><li>Section 43(A): Imposes liability for negligent data handling by body corporates used in service Level Agreement’s for data security and confidentiality clauses in outsourcing services.</li></ul></li><li>Consumer Protection Act, 2019:<ul><li>Section 85 : Holds Service providers accountable for faculty services, negligence, or warranty breachers, enforces resolution over courts.</li></ul></li><li>Arbitral Clause:<ul><li>Under Arbitration and Conciliation Act, 1996:<ul><li>Section 7: Governs arbitration agreements; incorporated in SLA dispute clauses for binding, efficient resolution over courts.</li><li>Section 9 &17: Enable interim relief before/during arbitration; safeguards SLA performance via urgent court or tribunal orders.</li></ul></li></ul></li></ul><p>The Both parties also agreed that in the event of any dispute arise relating to this agreement in future between the parties to this agreement the same has to be decided by appointing an Arbitrator at Guntur.</p>"
- Section 26 (Acceptance):
  "<p>By signing below, both parties acknowledge and agree to the terms and conditions set forth in this Service Level Agreement.</p>"
- Section 27 (Signature Block):
  "<div class=\"sig-matrix\"><div class=\"sig-block\"><strong>First Party:</strong><br>Signature: ________________<br>Name: Ayyappa Siginam<br>Designation: Chairman and Founder<br>Organisation: Atoms Digital Solutions</div><div class=\"sig-block\"><strong>Second Party:</strong><br>Signature: ________________<br>Name: {signatory_name}<br>Designation: {signatory_title}<br>Organisation: {client_name}</div></div>"

OPTIONAL SECTIONS:
- Only include optional sections (Section 8: Deliverables Carry Forward, Section 13: Provisional Period, Section 16: Non-Compete / Exclusivity, telecaller training details in Section 6 and Section 9, blogs details in Section 4, brands details in Section 4) if they are explicitly enabled in the collected data. If they are disabled/not agreed, omit their divs and headers completely (do not render blank headings or placeholders).

FORMATTING RULES:
- Rupee amounts must appear in both numeric and written form: e.g. Rs.40,000/- (Forty Thousand Rupees Only).
- Dates written in full words: e.g. Third Day of June 2026.

ON SUBSEQUENT CALLS (when the user requests amendments to the SLA text):
- Compare the current SLA text with the user request.
- If the user attempts to modify any of the FIXED sections (Limitation of Responsibility, Communication Protocol, Additional Requirements, Non-Payment Consequences, Governing Law, Legal Implications, Acceptance, Signature Block), you MUST decline. Set declined = true, and decline_reason = "Standard legal clauses cannot be modified."
- If the user request is vague, decline and request clarification. Set declined = true, and decline_reason = "Could you please clarify your request?"
- If the request is specific and valid:
  * For update: Set action = "update", section_name = name of the section (e.g. "Payment Terms"), updated_section_text = the revised HTML of just the inner contents of that section, full_sla_text = updated full HTML document.
  * For add: Set action = "add", section_name = name of the optional section (e.g. "Non-Compete / Exclusivity"), updated_section_text = the HTML content of the new section, full_sla_text = updated full HTML.
  * For remove: Set action = "remove", section_name = name of the section removed (e.g. "Provisional Period"), updated_section_text = "", full_sla_text = updated full HTML with the section's div completely removed.`;

// =========================================================================
// APP CONFIGURATION & STATE
// =========================================================================

let supabaseClient = null;

let appState = "MODE_SELECTION"; // MODE_SELECTION | COLLECTING | GENERATING | REVIEW | EDITING
let collectionMode = null;      // guided | quick
let conversationHistory = [];   // Array of {role: 'user'|'model', content: '...'}
let collectedData = {};         // Parsed JSON of collected inputs
let currentSLA = "";            // HTML string of the SLA document
let editHistory = [];           // Array of {type: 'add'|'update'|'remove', title: '...', desc: '...', time: '...'}
let sessionId = null;           // Supabase session ID

// =========================================================================
// DOM ELEMENTS
// =========================================================================

const dbStatusDot = document.querySelector('.status-dot');
const dbStatusText = document.querySelector('.status-text');

const stateModeSelection = document.getElementById('state-mode-selection');
const btnSelectGuided = document.getElementById('btn-select-guided');
const btnSelectQuick = document.getElementById('btn-select-quick');

const stateGenerating = document.getElementById('state-generating');

const workspaceLayout = document.getElementById('workspace-layout');
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const btnSendMessage = document.getElementById('btn-send-message');
const activeModeBadge = document.getElementById('active-mode-badge');
const typingIndicator = document.getElementById('typing-indicator');
const generationActionBar = document.getElementById('generation-action-bar');
const btnGenerateSla = document.getElementById('btn-generate-sla');

const documentView = document.getElementById('document-view');
const btnPrintPdf = document.getElementById('btn-print-pdf');

const historyLog = document.getElementById('history-log');
const badgeChanges = document.getElementById('badge-changes');
const supabaseSyncStatus = document.getElementById('supabase-sync-status');

// =========================================================================
// INITIALIZATION
// =========================================================================

async function initSupabase() {
    try {
        const res = await fetch('/api/config');
        if (!res.ok) throw new Error("Failed to load backend config.");
        const config = await res.json();
        
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
            console.log("Supabase Client initialized successfully.");
            
            dbStatusDot.className = "status-dot connected";
            dbStatusText.innerText = "Database Connected";
            if (supabaseSyncStatus) supabaseSyncStatus.innerText = "Status: Connected to Supabase";
        } else {
            throw new Error("Supabase SDK not loaded.");
        }
    } catch (err) {
        console.error("Database initialization failed:", err);
        dbStatusDot.className = "status-dot disconnected";
        dbStatusText.innerText = "Offline Mode";
        if (supabaseSyncStatus) supabaseSyncStatus.innerText = "Status: Offline (Local Storage)";
    }
}

function restoreSession() {
    try {
        const storedState = sessionStorage.getItem("appState");
        if (!storedState) return;

        appState = storedState;
        collectionMode = sessionStorage.getItem("collectionMode");
        conversationHistory = JSON.parse(sessionStorage.getItem("conversationHistory") || "[]");
        collectedData = JSON.parse(sessionStorage.getItem("collectedData") || "{}");
        currentSLA = sessionStorage.getItem("currentSLA") || "";
        editHistory = JSON.parse(sessionStorage.getItem("editHistory") || "[]");
        sessionId = sessionStorage.getItem("sessionId");

        renderWorkspaceForState();
    } catch (e) {
        console.error("Error restoring session state:", e);
    }
}

function saveSession() {
    try {
        sessionStorage.setItem("appState", appState);
        sessionStorage.setItem("collectionMode", collectionMode);
        sessionStorage.setItem("conversationHistory", JSON.stringify(conversationHistory));
        sessionStorage.setItem("collectedData", JSON.stringify(collectedData));
        sessionStorage.setItem("currentSLA", currentSLA);
        sessionStorage.setItem("editHistory", JSON.stringify(editHistory));
        if (sessionId) sessionStorage.setItem("sessionId", sessionId);
    } catch (e) {
        console.error("Error saving session state:", e);
    }
}

// =========================================================================
// EVENT LISTENERS
// =========================================================================

btnSelectGuided.addEventListener('click', () => startSlaSession('guided'));
btnSelectQuick.addEventListener('click', () => startSlaSession('quick'));

btnSendMessage.addEventListener('click', handleUserSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserSendMessage();
});

btnGenerateSla.addEventListener('click', generateSlaDocument);
btnPrintPdf.addEventListener('click', printSlaDocument);

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
    await initSupabase();
    restoreSession();
});

// =========================================================================
// RENDERING & STATE ROUTING
// =========================================================================

function renderWorkspaceForState() {
    // Hide all main views first
    stateModeSelection.classList.add('hidden');
    stateGenerating.classList.add('hidden');
    workspaceLayout.classList.add('hidden');
    generationActionBar.classList.add('hidden');

    if (appState === "MODE_SELECTION") {
        stateModeSelection.classList.remove('hidden');
    } 
    else if (appState === "COLLECTING" || appState === "GENERATION_READY") {
        workspaceLayout.classList.remove('hidden');
        workspaceLayout.className = "workspace-layout layout-collecting";
        
        chatInput.disabled = false;
        btnSendMessage.disabled = false;
        
        activeModeBadge.innerText = collectionMode === "guided" ? "Guided Mode" : "Quick Mode";
        renderChatMessages();
        
        if (appState === "GENERATION_READY") {
            generationActionBar.classList.remove('hidden');
            chatInput.disabled = true;
            btnSendMessage.disabled = true;
        }
    } 
    else if (appState === "GENERATING") {
        stateGenerating.classList.remove('hidden');
    } 
    else if (appState === "REVIEW" || appState === "EDITING") {
        workspaceLayout.classList.remove('hidden');
        workspaceLayout.className = "workspace-layout layout-review";
        
        if (appState === "REVIEW") {
            chatInput.disabled = false;
            btnSendMessage.disabled = false;
            chatInput.placeholder = "Request amendments (e.g., 'Change fee to Rs.60,000')...";
        } else {
            chatInput.disabled = true;
            btnSendMessage.disabled = true;
        }
        
        activeModeBadge.innerText = "Editing & Review";
        renderChatMessages();
        renderSlaDocument();
        renderEditHistory();
    }
}

function renderChatMessages() {
    chatLog.innerHTML = "";
    conversationHistory.forEach(msg => {
        // Strip out the completion signal text from displaying in chat
        let cleanContent = msg.content;
        if (cleanContent.includes("##DATA_COMPLETE##")) {
            cleanContent = cleanContent.split("##DATA_COMPLETE##")[0].trim();
        }
        
        if (cleanContent) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${msg.role === 'user' ? 'user' : 'ai'}`;
            msgDiv.innerHTML = formatMarkdown(cleanContent);
            chatLog.appendChild(msgDiv);
        }
    });
    chatLog.scrollTop = chatLog.scrollHeight;
}

function renderSlaDocument() {
    documentView.innerHTML = currentSLA;
}

function renderEditHistory() {
    historyLog.innerHTML = "";
    if (editHistory.length === 0) {
        historyLog.innerHTML = `<p class="empty-history-text">No changes recorded in this session yet.</p>`;
        badgeChanges.innerText = "0 Changes";
        return;
    }
    
    editHistory.forEach(item => {
        const card = document.createElement('div');
        card.className = `history-card ${item.type}`;
        card.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <span class="time-stamp">${item.time}</span>
        `;
        historyLog.appendChild(card);
    });
    
    badgeChanges.innerText = `${editHistory.length} Change${editHistory.length !== 1 ? 's' : ''}`;
}

// Simple markdown formatter
function formatMarkdown(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// =========================================================================
// ACTION HANDLERS
// =========================================================================

async function startSlaSession(mode) {
    collectionMode = mode;
    appState = "COLLECTING";
    conversationHistory = [];
    collectedData = {};
    currentSLA = "";
    editHistory = [];
    sessionId = null;
    
    renderWorkspaceForState();
    
    // Greet the user based on mode
    showTypingIndicator();
    let greeting = "";
    if (mode === "guided") {
        greeting = "Hello! I am your SLA Assistant. I will guide you through the process of generating a professional contract for your client. Let's start with **Block 1: Client Identity**. What is the **full client or organisation name**?";
    } else {
        greeting = "Hello! I am your SLA Assistant. Please paste your **raw client brief, notes, or emails** here. I will analyze the details, map them to our contract blocks, and ask only for missing fields.";
    }
    
    setTimeout(() => {
        hideTypingIndicator();
        conversationHistory.push({ role: 'model', content: greeting });
        renderChatMessages();
        saveSession();
    }, 600);
}

async function handleUserSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Append user message
    conversationHistory.push({ role: 'user', content: text });
    chatInput.value = "";
    renderChatMessages();
    saveSession();
    
    showTypingIndicator();
    
    if (appState === "COLLECTING") {
        // Call backend proxy with appropriate system instruction
        const systemInstruction = collectionMode === "guided" ? PROMPT_GUIDED_COLLECTION : PROMPT_QUICK_COLLECTION;
        try {
            const res = await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: conversationHistory,
                    systemInstruction: systemInstruction
                })
            });
            
            if (!res.ok) throw new Error("API Proxy responded with an error.");
            
            const data = await res.json();
            hideTypingIndicator();
            
            conversationHistory.push({ role: 'model', content: data.reply });
            
            // Check for Completion Signal
            if (data.reply.includes("##DATA_COMPLETE##")) {
                appState = "GENERATION_READY";
                try {
                    const jsonObject = extractJsonFromString(data.reply);
                    collectedData = jsonObject;
                    console.log("Collected Data:", collectedData);
                } catch (jsonErr) {
                    console.error("Could not parse collected variables JSON:", jsonErr);
                }
            }
            
            renderWorkspaceForState();
            saveSession();
            
        } catch (err) {
            hideTypingIndicator();
            const errMsg = "⚠️ Error communicating with assistant: " + err.message;
            conversationHistory.push({ role: 'model', content: errMsg });
            renderChatMessages();
        }
    } 
    else if (appState === "REVIEW") {
        // We are in Review/Editing mode, processing an edit request
        appState = "EDITING";
        renderWorkspaceForState();
        
        try {
            // Package conversation for the Architect
            // We append the current SLA context to the system prompt dynamically or as a user message
            const userPromptText = `CURRENT SLA TEXT IS:
[START_SLA]
${currentSLA}
[END_SLA]

USER AMENDMENT REQUEST:
"${text}"

Process this amendment and return the structured JSON.`;

            // We make a special message array for this call, sending the history but overriding the last prompt
            const res = await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: [
                        ...conversationHistory.slice(0, -1),
                        { role: 'user', content: userPromptText }
                    ],
                    systemInstruction: PROMPT_SLA_ARCHITECT,
                    responseMimeType: "application/json"
                })
            });
            
            if (!res.ok) throw new Error("API Proxy edit error.");
            
            const data = await res.json();
            hideTypingIndicator();
            
            let result = {};
            try {
                result = JSON.parse(data.reply);
            } catch (jsonErr) {
                console.error("Architect output was not valid JSON:", data.reply);
                throw new Error("SLA Architect returned invalid structure.");
            }
            
            if (result.declined) {
                // Show decline reason
                conversationHistory.push({ role: 'model', content: `❌ **Amendment Declined:** ${result.decline_reason}` });
                appState = "REVIEW";
                renderWorkspaceForState();
                saveSession();
            } else {
                // Successful edit!
                const action = result.action; // generate | update | add | remove
                const sectionName = result.section_name;
                const changeSummary = result.change_summary;
                
                // If it is a remove, we flash strikethrough on the old HTML before rendering the new one
                if (action === 'remove') {
                    // Try to find the section to remove
                    const sectionEl = documentView.querySelector(`[data-name="${sectionName}"]`);
                    if (sectionEl) {
                        sectionEl.className = "sla-section highlight-target highlight-removed";
                        
                        // Wait 8 seconds to fade out and render the new text
                        setTimeout(async () => {
                            currentSLA = result.full_sla_text;
                            renderSlaDocument();
                            await updateSlaDocumentInDb(currentSLA, action, sectionName, changeSummary);
                        }, 8000);
                    } else {
                        // fallback if element not found
                        currentSLA = result.full_sla_text;
                        renderSlaDocument();
                        await updateSlaDocumentInDb(currentSLA, action, sectionName, changeSummary);
                    }
                } else {
                    // For add or update, render new SLA immediately and apply highlight
                    currentSLA = result.full_sla_text;
                    renderSlaDocument();
                    
                    // Highlight the changed section
                    setTimeout(() => {
                        const sectionEl = documentView.querySelector(`[data-name="${sectionName}"]`);
                        if (sectionEl) {
                            const highlightClass = action === 'add' ? 'highlight-added' : 'highlight-updated';
                            sectionEl.className = `sla-section highlight-target ${highlightClass}`;
                            
                            setTimeout(() => {
                                sectionEl.className = "sla-section highlight-target";
                            }, 8000);
                        }
                    }, 100);
                    
                    await updateSlaDocumentInDb(currentSLA, action, sectionName, changeSummary);
                }
                
                conversationHistory.push({ role: 'model', content: `✅ **SLA Amended:** ${changeSummary}` });
                
                // Track edit history card
                editHistory.unshift({
                    type: action,
                    title: `${action.toUpperCase()}: ${sectionName}`,
                    desc: changeSummary,
                    time: getFormattedTime()
                });
                
                appState = "REVIEW";
                renderWorkspaceForState();
                saveSession();
            }
            
        } catch (err) {
            hideTypingIndicator();
            conversationHistory.push({ role: 'model', content: `⚠️ Amendment failed: ${err.message}` });
            appState = "REVIEW";
            renderWorkspaceForState();
            saveSession();
        }
    }
}

async function generateSlaDocument() {
    appState = "GENERATING";
    renderWorkspaceForState();
    
    try {
        // Send a call to the Architect with collected variables
        const generationPrompt = `Generate initial SLA document using this collected variables block:
${JSON.stringify(collectedData)}`;

        const res = await fetch('/api/proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                history: [{ role: 'user', content: generationPrompt }],
                systemInstruction: PROMPT_SLA_ARCHITECT,
                responseMimeType: "application/json"
            })
        });
        
        if (!res.ok) throw new Error("API SLA generation error.");
        
        const data = await res.json();
        let result = {};
        try {
            result = JSON.parse(data.reply);
        } catch (jsonErr) {
            console.error("SLA Architect generate parse error:", data.reply);
            throw new Error("SLA Architect returned invalid format.");
        }
        
        currentSLA = result.full_sla_text;
        
        // Save initial rows in Supabase
        await createSlaSessionInDb();
        
        conversationHistory.push({ role: 'model', content: "🎉 **SLA Legal Document generated successfully!** You can review the draft in the centre panel. Feel free to request any edits in the chat (e.g. 'Change the monthly fee to Rs.55,000' or 'Remove the provisional period')." });
        
        appState = "REVIEW";
        renderWorkspaceForState();
        saveSession();
        
    } catch (err) {
        appState = "COLLECTING";
        renderWorkspaceForState();
        conversationHistory.push({ role: 'model', content: `⚠️ Generation failed: ${err.message}. Please click generate again.` });
        renderChatMessages();
    }
}

async function printSlaDocument() {
    window.print();
    
    // Set status to finalised in Supabase
    if (supabaseClient && sessionId) {
        try {
            const { error } = await supabaseClient
                .from('sla_sessions')
                .update({ 
                    session_status: 'finalised', 
                    last_updated_at: new Date().toISOString() 
                })
                .eq('id', sessionId);
                
            if (error) throw error;
            console.log("Session finalised in Database.");
            if (supabaseSyncStatus) supabaseSyncStatus.innerText = "Status: Session Finalised & Saved";
        } catch (dbErr) {
            console.error("Error finalising session in Supabase:", dbErr);
        }
    }
}

// =========================================================================
// SUPABASE SYNCRONIZATION ENGINES
// =========================================================================

async function createSlaSessionInDb() {
    if (!supabaseClient) return;
    
    try {
        if (supabaseSyncStatus) supabaseSyncStatus.innerText = "Status: Syncing session to Supabase...";
        
        // 1. Insert into sla_sessions
        const { data: sessionData, error: sessionErr } = await supabaseClient
            .from('sla_sessions')
            .insert([{
                client_name: collectedData.client_name || "Client Name Not Defined",
                organisation_type: collectedData.org_type || "hospital",
                collection_mode: collectionMode,
                session_status: 'draft',
                created_at: new Date().toISOString(),
                last_updated_at: new Date().toISOString(),
                entity_type: collectedData.legal_entity_type || ""
            }])
            .select()
            .single();
            
        if (sessionErr) throw sessionErr;
        sessionId = sessionData.id;
        
        // 2. Insert into sla_documents
        const { error: docErr } = await supabaseClient
            .from('sla_documents')
            .insert([{
                session_id: sessionId,
                conversation_history: conversationHistory,
                collected_data: collectedData,
                sla_text: currentSLA,
                edit_history: [{ action: 'generate', section_name: 'All', summary: 'Initial SLA generated', timestamp: new Date().toISOString() }],
                generated_at: new Date().toISOString(),
                last_edited_at: new Date().toISOString()
            }]);
            
        if (docErr) throw docErr;
        
        if (supabaseSyncStatus) {
            supabaseSyncStatus.innerText = "Status: Session Created & Saved in Supabase";
            supabaseSyncStatus.style.color = "#10b981";
        }
        
    } catch (err) {
        console.error("Supabase Save Error:", err);
        if (supabaseSyncStatus) {
            supabaseSyncStatus.innerText = "Status: Sync Error (Local Saved)";
            supabaseSyncStatus.style.color = "#ef4444";
        }
    }
}

async function updateSlaDocumentInDb(newText, action, sectionName, summary) {
    if (!supabaseClient || !sessionId) return;
    
    try {
        if (supabaseSyncStatus) supabaseSyncStatus.innerText = "Status: Updating document in Supabase...";
        
        // Append history entry
        const newHistoryItem = {
            action: action,
            section_name: sectionName,
            summary: summary,
            timestamp: new Date().toISOString()
        };
        
        // Fetch current document first to append to edit history array
        const { data: docData, error: fetchErr } = await supabaseClient
            .from('sla_documents')
            .select('edit_history')
            .eq('session_id', sessionId)
            .single();
            
        if (fetchErr) throw fetchErr;
        
        const historyArray = docData.edit_history || [];
        historyArray.push(newHistoryItem);
        
        // Update document text and history
        const { error: docErr } = await supabaseClient
            .from('sla_documents')
            .update({
                sla_text: newText,
                edit_history: historyArray,
                last_edited_at: new Date().toISOString()
            })
            .eq('session_id', sessionId);
            
        if (docErr) throw docErr;
        
        // Update session last updated timestamp
        await supabaseClient
            .from('sla_sessions')
            .update({ last_updated_at: new Date().toISOString() })
            .eq('id', sessionId);
            
        if (supabaseSyncStatus) {
            supabaseSyncStatus.innerText = "Status: Document Synced & Saved";
            supabaseSyncStatus.style.color = "#10b981";
        }
        
    } catch (err) {
        console.error("Supabase Update Error:", err);
        if (supabaseSyncStatus) {
            supabaseSyncStatus.innerText = "Status: Sync Error (Local Saved)";
            supabaseSyncStatus.style.color = "#ef4444";
        }
    }
}

// =========================================================================
// HELPERS
// =========================================================================

function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
    chatLog.scrollTop = chatLog.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
}

function extractJsonFromString(str) {
    const start = str.indexOf('{');
    const end = str.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
        const jsonStr = str.substring(start, end + 1);
        return JSON.parse(jsonStr);
    }
    throw new Error("No JSON object found in string");
}

function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
