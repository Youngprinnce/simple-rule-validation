const {
    sendError,
    sendSuccess,
    validFailed,
    validPassed,
    validateData } = require("../utils");

const validation = (req, res, next) => {
    const { rule, data } = req.body;
    let fieldArray = []
    let fieldr;
    let field_value
    const allowedFields = ["field", "condition", "condition_value"];
    const allowedConditions = ["eq", "neq", "gt", "gte", "contains"];


    //Check to make sure correct JSON payload is passed to the API
    if(!rule || !data) {
        const message = "rule is required."
        return sendError(res, message);
    }
    
    //Check to make sure both rule and data fields are required
    if(!req.body.hasOwnProperty("rule")) {
        const message = "rule is required."
        return sendError(res, message);
    }

    if (!req.body.hasOwnProperty("data")) {
        const message = "data is required."
        return sendError(res, message);
    }

    //Check to make sure rule is a valid json object and has the required fields
    if (typeof rule !== "object" || Array.isArray(rule)) {
        const message = "rule should be an object."
        return sendError(res, message);
    }

    //Check to make sure rule has a valid payload
    for (let field of allowedFields) {
        if (!rule.hasOwnProperty(field)) {
            const message = `${field} is required.`
            return sendError(res, message);
        }
    }

    //Check to make sure that the condition passed is valid
    if (!allowedConditions.includes(rule.condition)) {
        const message = `rule.condition should be one of ${allowedConditions.join(", ")}.`
        return sendError(res, message);
    }

    //Check to make sure data is not empty
    if (!Object.keys(data).length) {
      const message = 'data field is required.';
      return sendError(res, message);
    }

    //Check if data is an object
    if (typeof data === "object"){
        fieldArray = rule.field.split(".")
        if (fieldArray.length === 2){
            fieldr = `${fieldArray[0]}.${fieldArray[1]}`
            field_value = data[fieldArray[0]][fieldArray[1]]
        }else if (fieldArray.length === 1) {
            fieldr = fieldArray[0]
            field_value = data[fieldArray[0]]
        }
    } else {
        fieldr = rule.field
        field_value = data[rule.field]
    }

    if (typeof field_value === "undefined"){
        const message = `Field ${fieldr} is missing from data.`;
        return sendError(res, message)
    }

    const isValid = validateData(rule, field_value)
    if(isValid){
        return validPassed(res, rule.field, field_value, rule.condition, rule.condition_value)
    } else {
        return validFailed(res, rule.field, field_value, rule.condition, rule.condition_value)
    }
}

module.exports = validation