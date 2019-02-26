/**
 * Valid a request
 * @param {Object} body - Object you want to validate
 * @param {Object} expectedError - The 
 */
const validate = (body, expectedError) => {
 for (let key in expectedError) {
   if (!expectedError.hasOwnProperty(key)) {
     continue; // Dont process inherited properties
   };
   if (!body[key]) {
     return expectedError[key];
   };
 };
 return true;
};

/**
 * Convert and format the error 
 * @param {Object} error - Error to processError
 * @return The formatted error message in an object
 */
const processError = (error) => {
 let sendError = {};
 if (typeof error === 'string') {
   sendError.error = error;
 } else {
   sendError.error = error.error || error.message || 'An error has occurred';
 };
 return sendError;
};

module.exports = {
 validate,
 processError
};
