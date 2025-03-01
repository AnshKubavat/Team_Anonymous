import { Router } from "express";
import axios from "axios";

const route = Router();

route.post("/", async (req, res) => {
    try {
        const { text, targetLanguage } = req.body;
        if (!text || !targetLanguage) {

            return res.status(400).json({ error: "Text and target language are required" });
        }

        // 🔹 Map language names to Google Translate API codes
        const languageMap = {
            English: "en",
            Hindi: "hi",
            Gujarati: "gu"
        };
        const langCode = languageMap[targetLanguage] || targetLanguage;
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2`,
            {},
            {
                params: {
                    q: text,
                    target: langCode,
                    key: process.env.GOOGLE_TRANSALATE_API_KEY, // Ensure this is set in .env
                },
            }
        );
        res.json({ translatedText: response.data.data.translations[0].translatedText });
    } catch (error) {
        res.status(500).json({ error: "Translation failed" });
    }
});

export default route;