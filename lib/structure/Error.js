const errors = {
    "NO_CLIENT": {
        "category": "TYPE",
        "text": "MISSING CLIENT! DID YOU PASS IN THE CLIENT OBJECT?",
    },

    "UNKNOWN_MSG": {
        "category": "NORMAL",
        "text": "UNKNOWN MESSAGE!",
    },

    "AXIOS_ERROR": {
        "category": "NORMAL",
        "text": "AXIOS ERROR!"
    }
};

/**
 * 
 * @param {String} error 
 * @returns 
 */
function makeError(error) {
    const e = errors[error];

    if (e.category == "type") {
        return new TypeError(e.text);
    } else if (e.category == "normal") {
        return new Error(e.text);
    };
};

module.exports = makeError;