const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = "8533735159:AAEWVlLZWx1y2pB4LUxiylidiAX5WGB5s7I";
const PORT = process.env.PORT || 3000;

app.post("/", async (req, res) => {
  const message = req.body.message;

  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/start") {
      await sendMessage(chatId, "🔥 Tyro Ex Bot is now working!");
    }

    if (text === "/menu") {
      await sendMessage(chatId, "📊 Main Menu\n/products\n/wallet\n/orders");
    }
  }

  res.sendStatus(200);
});

async function sendMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}

app.listen(PORT, () => {
  console.log("Server running...");
});
