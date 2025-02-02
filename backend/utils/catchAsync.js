/**
 * Higher-order function to catch and handle asynchronous errors in Express routes.
 * This helps avoid repetitive try-catch blocks in route handlers.
 *
 * @param {Function} func - The async function to wrap.
 * @returns {Function} - A middleware function that catches errors and passes them to Express error handling.
 */
export default function catchAsync(func) {
    return (req, res, next) => {
        func(req, res, next)
            .catch(err => next(err)); // Forward any errors to Express error handling middleware
    };
}
