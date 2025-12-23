async function sendMessage() {
    let input = document.getElementById("user-input");
    let messageArea = document.getElementById("chat-messages");

    if (input.value.trim() !== "") {
        const userText = input.value;
        
        // ഉപയോക്താവിന്റെ മെസ്സേജ്
        let userDiv = document.createElement("p");
        userDiv.className = "user-msg";
        userDiv.textContent = userText;
        messageArea.appendChild(userDiv);
        input.value = "";

        // AI മറുപടിക്ക് കാക്കുന്നു
        let botDiv = document.createElement("p");
        botDiv.className = "bot-msg";
        botDiv.textContent = "ചിന്തിക്കുന്നു...";
        messageArea.appendChild(botDiv);
        messageArea.scrollTop = messageArea.scrollHeight;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText })
            });
            const data = await response.json();
            botDiv.textContent = data.reply; // യഥാർത്ഥ മറുപടി വരുന്നു
        } catch (error) {
            botDiv.textContent = "Error: AI ബന്ധിപ്പിക്കാൻ സാധിച്ചില്ല!";
        }
        messageArea.scrollTop = messageArea.scrollHeight;
    }
}
