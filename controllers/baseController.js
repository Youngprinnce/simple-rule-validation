const { sendSuccess } = require("../utils")
const config = require("../config/config")

const base = (req, res) => {
    const message = "My Rule-Validation API"
    return sendSuccess(res, message, config.profile)
}

module.exports = base