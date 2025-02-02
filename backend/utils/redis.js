import { createClient } from "redis";

const redisClient = createClient();
await redisClient.connect();

/**
 * Retrieves cached data if available; otherwise, fetches new data using a callback, caches it, and returns it.
 *
 * @param {string} key - The cache key to look up.
 * @param {Function} callback - A function that fetches data if not found in cache.
 * @returns {Promise<any>} - The cached or newly fetched data.
 */
async function getOrSetCache(key, callback) {
    try {
        const data = await redisClient.get(key);
        if (data !== null) {
            return JSON.parse(data);
        }
        const FAQs = await callback();
        await redisClient.set(key, JSON.stringify(FAQs));
        return FAQs;
    } catch (error) {
        throw error;
    }
}

/**
 * Clears all cached data from Redis.
 * This ensures that stale data does not persist after updates.
 */
async function clearCache() {
    await redisClient.flushAll();
}

export default { clearCache, getOrSetCache };
