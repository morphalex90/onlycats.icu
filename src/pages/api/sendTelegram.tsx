import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

const Telegram = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiToken = process.env.TELEGRAM_API_TOKEN;
    const chatId = '@OnlyCatsIcu'

    if (!apiToken || !chatId) {
        console.error("Missing TELEGRAM_API_TOKEN or TELEGRAM_CHAT_ID");
        return res.status(500).json({ success: false, error: 'Missing environment variables' });
    }

    try {
        const catRes = await axios.get('https://api.thecatapi.com/v1/images/search?page=0&limit=1');
        const catImageUrl = catRes.data?.[0]?.url;

        if (!catImageUrl) {
            throw new Error('No cat image URL returned');
        }

        const telegramUrl = `https://api.telegram.org/bot${apiToken}/sendMessage`;

        const response = await axios.post(telegramUrl, {
            chat_id: chatId,
            text: catImageUrl,
        });

        return res.status(200).json({ success: true, message: response.data });
    } catch (error) {
        console.error("Telegram API error:", error);
        return res.status(500).json({ success: false, error: 'Failed to send Telegram message' });
    }
};

export default Telegram;