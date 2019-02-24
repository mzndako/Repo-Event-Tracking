/**
 * Valid request
 */
 const validate = (body, expectedError) => {
   for(let key in expectedError){
     if (!expectedError.hasOwnProperty(key)) {
       continue; // Dont process inherited properit
     }
     let key = body[i];
     if (expectedError[key] && body) {
       
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