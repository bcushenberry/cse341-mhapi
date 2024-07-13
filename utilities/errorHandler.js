const errorHandler = {};

errorHandler.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = errorHandler;