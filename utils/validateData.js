const validateData = (rule, data) => {
    let isValid = false;
    switch (rule.condition) {
        case "eq":
            isValid =  data === rule.condition_value ? true : false;
            break;
        case "neq":
            isValid = data !== rule.condition_value ? true : false;
            break;
        case "gt":
            isValid = data > rule.condition_value ? true : false;
            break;
        case "gte":
            isValid = data >= rule.condition_value ? true : false;
            break;
        case "contains":
            isValid = data.toString().includes(rule.condition_value.toString()) ? true : false;
            break;
        default:
            break;
    }
    return isValid
}

module.exports = validateData