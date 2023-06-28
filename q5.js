const request = require('request-promise');

async function getGoogleHomePage() {
  try {
    const response = await request('http://www.google.com');
    console.log('statusCode:', response.statusCode); 
    console.log('body:', response.body); 
    return response.body;
  } catch (error) {
    console.error('error:', error); 
    throw error;
  }
}

getGoogleHomePage()
  .then(result => {
    console.log('RESULT==>', result);
  })
  .catch(error => {
    console.error('ERROR==>', error);
  });
