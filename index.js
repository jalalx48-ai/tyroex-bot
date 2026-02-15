const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = "8533735159:AAEWVlLZWx1y2pB4LUxiylidiAX5WGB5s7I"; // 👈 PUT YOUR BOT TOKEN HERE
const ADMIN_ID = "7303770059"; // 👈 PUT YOUR TELEGRAM ID HERE

let users = {};
let orders = {};

function sendMessage(chatId, text, keyboard = null) {
  return fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      reply_markup: keyboard
    })
  });
}

function mainMenu() {
  return {
    keyboard: [
      ["📊 Dashboard"],
      ["🛍 Products", "💰 Wallet"],
      ["📦 Orders"]
    ],
    resize_keyboard: true
  };
}

app.post("/", async (req, res) => {
  const message = req.body.message;
  if (!message) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text;

  if (!users[chatId]) {
    users[chatId] = { balance: 0, profit: 0 };
    orders[chatId] = [];
  }

  // START
  if (text === "/start") {
    await sendMessage(
      chatId,
      "🔥 Welcome to Tyro Ex Bot\n\nChoose an option:",
      mainMenu()
    );
  }

  // DASHBOARD
  else if (text === "📊 Dashboard") {
    await sendMessage(
      chatId,
      `📊 Dashboard\n\n💰 Balance: ₹${users[chatId].balance}\n📦 Orders: ${orders[chatId].length}\n💵 Total Profit: ₹${users[chatId].profit}`
    );
  }

  // WALLET
  else if (text === "💰 Wallet") {
    await sendMessage(
      chatId,
      `💰 Wallet\n\nAvailable Balance: ₹${users[chatId].balance}`
    );
  }

  // PRODUCTS
  else if (text === "🛍 Products") {
    await sendMessage(
      chatId,
      "🛍 Products:\n\n1️⃣ Silver Plan - ₹100\n2️⃣ Gold Plan - ₹500\n3️⃣ Platinum Plan - ₹1000\n\nType: buy 100 / buy 500 / buy 1000"
    );
  }

  // BUY SYSTEM
  else if (text.startsWith("buy")) {
    const amount = parseInt(text.split(" ")[1]);

    if (!amount || ![100, 500, 1000].includes(amount)) {
      await sendMessage(chatId, "❌ Invalid plan.");
    } else if (users[chatId].balance < amount) {
      await sendMessage(chatId, "❌ Not enough balance.");
    } else {
      users[chatId].balance -= amount;

      const profit = Math.floor(amount * 0.3); // 30% fake profit
      users[chatId].profit += profit;
      users[chatId].balance += amount + profit;

      orders[chatId].push({
        amount,
        profit
      });

      await sendMessage(
        chatId,
        `✅ Order Successful!\n\nInvested: ₹${amount}\nProfit: ₹${profit}\nNew Balance: ₹${users[chatId].balance}`
      );
    }
  }

  // ORDERS
  else if (text === "📦 Orders") {
    if (orders[chatId].length === 0) {
      await sendMessage(chatId, "📦 No orders yet.");
    } else {
      let orderText = "📦 Your Orders:\n\n";
      orders[chatId].forEach((o, i) => {
        orderText += `${i + 1}. ₹${o.amount} → Profit ₹${o.profit}\n`;
      });
      await sendMessage(chatId, orderText);
    }
  }

  // ADMIN ADD BALANCE
  else if (text.startsWith("/add") && chatId == ADMIN_ID) {
    const parts = text.split(" ");
    const userId = parts[1];
    const amount = parseInt(parts[2]);

    if (users[userId]) {
      users[userId].balance += amount;
      await sendMessage(chatId, "✅ Balance added.");
    } else {
      await sendMessage(chatId, "❌ User not found.");
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bot is running...");
});

app.listen(3000, () => {
  console.log("Server running...");
});
