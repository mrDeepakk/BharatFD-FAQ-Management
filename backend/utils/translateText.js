import axios from 'axios';
export default async function translateText(text,lang="en"){
    const translation = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`,
        {
            q: text,
            target: lang
        }
    );
    return translation.data.data.translations[0].translatedText
}