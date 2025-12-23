const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// നിങ്ങളുടെ ശരിയായ API Key ഇവിടെ നൽകുക
const genAI = new GoogleGenerativeAI("AIzaSyBPba1wt-7Q7H2P9s2yJZcaB45YYHm5AyM");

app.post('/api/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const userPrompt = req.body.message;

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("AI Setup Error:", error);
        res.status(500).json({ reply: "ക്ഷമിക്കണം, AI സെറ്റപ്പിൽ ഒരു പ്രശ്നമുണ്ട്!" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 MIUXO AI സജീവമാണ്: http://localhost:${PORT}`);
});
