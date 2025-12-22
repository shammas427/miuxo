const express = require('express');
const path = require('path');
const app = express();

// പോർട്ട് നമ്പർ (Environment പോർട്ട് അല്ലെങ്കിൽ 3000)
const PORT = process.env.PORT || 3000;

// സ്റ്റാറ്റിക് ഫയലുകൾ (HTML, CSS, JS) സെർവ് ചെയ്യാൻ
app.use(express.static(path.join(__dirname)));

// പ്രധാന പേജ് (Home Page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ഏതെങ്കിലും പിശക് സംഭവിച്ചാൽ (404 Error)
app.use((req, res) => {
    res.status(404).send('<h1>404 - പേജ് കണ്ടെത്താനായില്ല!</h1>');
});

// സെർവർ റണ്ണിംഗ് മെസ്സേജ്
app.listen(PORT, () => {
    console.log('\n===========================================');
    console.log(`🚀 MIUXO AI SERVER IS ACTIVE`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('===========================================\n');
});
