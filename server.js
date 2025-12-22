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

// പിശകുകൾ വന്നാൽ 
app.use((req, res) => {
    res.status(404).send('<h1>MIUXO AI - ഈ പേജ് ലഭ്യമല്ല!</h1>');
});

// സെർവർ സ്റ്റാർട്ട് ചെയ്യുന്നു
app.listen(PORT, () => {
    console.log('\n-------------------------------------------');
    console.log(`🚀 MIUXO AI SERVER RUNNING ON PORT: ${PORT}`);
    console.log(`🔗 Link: http://localhost:${PORT}`);
    console.log('-------------------------------------------\n');
});
const express = require('express');
const path = require('path');
const app = express();
// Google AI ലൈബ്രറി ഇൻസ്റ്റാൾ ചെയ്യണം: npm install @google/generative-ai
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// നിങ്ങളുടെ Gemini API Key ഇവിടെ നൽകുക
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

app.post('/api/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = req.body.message;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "ക്ഷമിക്കണം, AI കണക്ഷനിൽ പ്രശ്നമുണ്ട്." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MIUXO AI Running on ${PORT}`));
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    // ഇവിടെ AI API (Gemini/OpenAI) കണക്ട് ചെയ്യാം. 
    // ഇപ്പോൾ ഒരു താൽക്കാലിക മറുപടി നൽകുന്നു.
    const aiReply = "MIUXO AI നിങ്ങളെ സഹായിക്കാൻ തയ്യാറാണ്. നിങ്ങൾ ചോദിച്ചത്: " + userMessage;
    
    res.json({ reply: aiReply });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
