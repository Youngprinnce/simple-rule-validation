const {sendSuccess, sendError, validPassed, validFailed } = require("./responseHandler");
const validateData = require("./validateData")

module.exports = {
    sendError,
    sendSuccess,
    validFailed,
    validPassed,
    validateData
}