const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🔥 Tyro Ex Bot is running!");
});

app.post("/", async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.sendStatus(200);
  }

  const chatId = message.chat.id;
  const text = message.text;

  // START COMMAND
  if (text === "/start") {
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
  }

  // DASHBOARD
  else if (text === "📊 Dashboard") {
    await sendMessage(chatId, "📊 Dashboard\n\nBalance: ₹0\nActive Orders: 0");
  }

  // WALLET
  else if (text === "💰 Wallet") {
    await sendMessage(chatId, "💰 Wallet\n\nAvailable Balance: ₹0");
  }

  // PRODUCTS
  else if (text === "🛍 Products") {
    await sendMessage(chatId,
      "🛍 Products:\n\n1️⃣ Silver Plan\n2️⃣ Gold Plan\n3️⃣ Platinum Plan\n4️⃣ Diamond Plan"
    );
  }

  // ORDERS
  else if (text === "📈 Orders") {
    await sendMessage(chatId, "📈 Your Orders\n\nNo active orders.");
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
  console.log(`Server running on port ${PORT}`);
});
