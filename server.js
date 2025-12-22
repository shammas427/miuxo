const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// നിങ്ങളുടെ index.html ഫയൽ ഉള്ള ഫോൾഡർ കാണിച്ചു കൊടുക്കുന്നു
app.use(express.static(__dirname));

// വെബ്സൈറ്റ് ഹോം പേജ് ലോഡ് ചെയ്യാൻ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// സെർവർ പ്രവർത്തിപ്പിക്കുന്നു
app.listen(PORT, () => {
    console.log(`സെർവർ തയ്യാറായിക്കഴിഞ്ഞു! http://localhost:${PORT} സന്ദർശിക്കുക`);
});
