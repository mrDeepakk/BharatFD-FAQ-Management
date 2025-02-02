import FAQ from "../models/faq.js";
import translateText from "../utils/translateText.js";
import redisHandler from "../utils/redis.js";

/**
 * Fetch FAQs from the database or cache, and translate them based on the requested language.
 * Caching is used to optimize performance and reduce redundant database queries.
 */
async function getFAQs(req, res) {
    const { lang } = req.query;

    const FAQs = await redisHandler.getOrSetCache(`language:${lang || "en"}`, async () => {
        const fetchedFAQs = await FAQ.find({}); // Fetch all FAQs from the database
        const translatedFAQs = [];

        // Translate each FAQ's question and answer into the requested language
        for (const ele of fetchedFAQs) {
            const question = await translateText(ele.question, lang);
            const answer = await translateText(ele.answer, lang);
            translatedFAQs.push({ ...ele.toObject(), question, answer });
        }
        return translatedFAQs;
    });

    res.json(FAQs);
}

/**
 * Add a new FAQ entry to the database after validating and translating the input.
 * Clears the cache to ensure data consistency.
 */
async function addFAQ(req, res) {
    const FAQdata = req.body;
    console.log(FAQdata);

    // Validate input: Question and Answer cannot be empty
    if (FAQdata.question == "" || FAQdata.answer == null) {
        return res.status(400).json({
            message: "Question/Answer cannot be empty"
        });
    }

    // Translate the question and answer before storing them
    FAQdata.question = await translateText(FAQdata.question);
    FAQdata.answer = await translateText(FAQdata.answer);

    const newFAQ = new FAQ(FAQdata);
    await newFAQ.save(); // Save the new FAQ entry in the database

    redisHandler.clearCache(); // Clear cache to ensure updated data is fetched next time

    res.status(201).json(newFAQ);
}

/**
 * Delete an FAQ entry based on the provided FAQ ID.
 * Clears the cache to remove outdated data.
 */
async function deleteFAQ(req, res) {
    const { faqId } = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(faqId); // Delete the FAQ from the database

    redisHandler.clearCache(); // Clear cache to ensure data consistency

    res.json({ message: "Deleted the FAQ", data: deletedFAQ });
}

export default { getFAQs, addFAQ, deleteFAQ };
