import axios from "axios";

const Telegram = async (req, res) => {
    const apiToken = '5637414760:AAH-aF8WDzNu8gouM_Y0RFba2bKTNWkhWn0';

    axios
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
        .catch((err) => { console.log(err); });

    return res.status(200).json({ success: true })
};

export default Telegram;