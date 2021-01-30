const sendSuccess = (response, message,  data = null) => {
  const resp = {
    message,
    status: "success",
    data
  };
  return response.status(200).json(resp);
};

const sendError = ( response, message, data = null) => {
  const resp = {
    message,
    status: "error",
    data
  };
  return response.status(400).json(resp);
};

const validPassed = (response, field, field_value, condition, condition_value) => {
  const resp = {
    message: `field ${field} successfully validated.`,
    status: "success",
    data: {
      validation: {
        error: false,
        field,
        field_value,
        condition,
        condition_value
      }
    }
  }
  return response.status(200).json(resp)
}

const validFailed = (response, field, field_value, condition, condition_value) => {
  const resp = {
    message: `field ${field} failed validation.`,
    status: "error",
    data: {
      validation: {
        error: true,
        field,
        field_value,
        condition,
        condition_value
      }
    }
  }
  return response.status(400).json(resp)
}

module.exports = { sendSuccess, sendError, validPassed, validFailed};
