/**
 * Valid request
 */
 const validate = (array) => {
   for(let i = 0; )
 };
 
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
 }