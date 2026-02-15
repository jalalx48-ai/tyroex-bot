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
      else if (text === "📊 Dashboard") {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "📊 Dashboard\n\n💰 Balance: ₹0\n📦 Active Orders: 0\n💵 Total Profit: ₹0"
    })
  });
}

else if (text === "💰 Wallet") {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "💰 Wallet\n\nAvailable Balance: ₹0"
    })
  });
}

else if (text === "🛍 Products") {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "🛍 Products:\n\n1️⃣ Silver Plan\n2️⃣ Gold Plan\n3️⃣ Platinum Plan\n4️⃣ Diamond Plan"
    })
  });
}

else if (text === "📦 Orders") {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "📦 You have no active orders."
    })
  });
}
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
