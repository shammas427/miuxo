const express = require('express');
const path = require('path');
const app = express();

// പോർട്ട് കോൺഫിഗറേഷൻ
const PORT = process.env.PORT || 3000;

// JSON ഡാറ്റ കൈകാര്യം ചെയ്യാൻ (ഭാവിയിലെ AI ചാറ്റിന് ആവശ്യമാണ്)
app.use(express.json());

// സ്റ്റാറ്റിക് ഫയലുകൾ (HTML, CSS, JS) കാണിച്ചു കൊടുക്കുന്നു
app.use(express.static(path.join(__dirname)));

// പ്രധാന പേജ് ലോഡ് ചെയ്യാൻ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ഒരു സാമ്പിൾ API - ഭാവിയിൽ AI റെസ്പോൺസ് നൽകാൻ ഇത് സഹായിക്കും
app.get('/api/info', (req, res) => {
    res.json({
        name: "MIUXO AI",
        status: "Active",
        version: "1.0.0"
    });
});
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// നിങ്ങളുടെ API Key ഇവിടെ ചേർത്തു
const genAI = new GoogleGenerativeAI("AIzaSyBPba1wt-7Q7H2P9s2yJZcaB45YYHm5AyM");

app.post('/api/chat', async (req, res) => {
    try {
        // Gemini 1.5 Flash ആണ് ഏറ്റവും വേഗതയുള്ള മോഡൽ
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const userPrompt = req.body.message;

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ reply: "ക്ഷമിക്കണം, AI കണക്ഷനിൽ ചെറിയൊരു പ്രശ്നം!" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    -------------------------------------------
    🚀 MIUXO AI സജീവമാണ്!
    🌐 സന്ദർശിക്കുക: http://localhost:${PORT}
    -------------------------------------------
    `);
});
