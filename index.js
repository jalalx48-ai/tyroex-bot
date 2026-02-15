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

    if (text === "if (text === "/start") {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "🔥 Welcome to Tyro Ex Bot\n\nChoose an option:",
      reply_markup: {
        keyboard: [
          ["📊 Dashboard"],
          ["🛍 Products", "💰 Wallet"],
          ["📈 Orders"]
        ],
        resize_keyboard: true
      }
    })
  });
  }") {
      await sendMainMenu(chatId);
    }

    if (text === "💰 Wallet") {
      await sendMessage(chatId, "Your wallet is empty ₹0");
    }

    if (text === "📊 Orders") {
      await sendMessage(chatId, "No active orders.");
    }

    if (text === "🛍 Products") {
      await sendMessage(chatId, "Available Plans:\nSilver\nGold\nPlatinum\nDiamond");
    }
  }

  res.sendStatus(200);
});

async function sendMainMenu(chatId) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "📊 Main Menu",
      reply_markup: {
        keyboard: [
          ["🛍 Products"],
          ["💰 Wallet"],
          ["📊 Orders"]
        ],
        resize_keyboard: true
      }
    })
  });
}

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
