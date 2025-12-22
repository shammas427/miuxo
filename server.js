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
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const genAI = new GoogleGenerativeAI("AIzaSyBPba1wt-7Q7H2P9s2yJZcaB45YYHm5AyM");

app.post('/api/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(req.body.message);
        res.json({ reply: result.response.text() });
    } catch (e) {
        res.status(500).json({ reply: "Error!" });
    }
});

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(3000, () => console.log("MIUXO AI ready on http://localhost:3000"));
