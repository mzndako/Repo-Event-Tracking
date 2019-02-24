/**
 * Valid request
 */
 const validate = (body, expectedError) => {
   for(let i = 0; i < body.length; i++){
     let key = body[i];
     if (expectedError[key] ) {
       
     }
   }
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