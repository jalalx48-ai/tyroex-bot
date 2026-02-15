const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🔥 Tyro Ex Bot is running!");
});

app.post("/", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/start") {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🔥 Welcome to Tyro Ex Bot!\n\nChoose an option:",
          reply_markup: {
            keyboard: [
              ["📊 Dashboard"],
              ["🛍 Products", "💰 Wallet"],
              ["📦 Orders"]
            ],
            resize_keyboard: true
          }
        })
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
