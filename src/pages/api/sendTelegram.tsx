import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

const Telegram = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiToken = process.env.TELEGRAM_API_TOKEN;

    await axios
        .get('https://api.thecatapi.com/v1/images/search?page=0&limit=1')
        .then((response) => {

            const params = new URLSearchParams({
                chat_id: '@OnlyCatsIcu',
                text: response.data[0].url,
            });

            fetch('https://api.telegram.org/bot' + apiToken + '/sendMessage?' + params.toString(), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
        })
        .catch(() => {
            // console.log(err);
        });

    return res.status(200).json({ success: true })
};

export default Telegram;