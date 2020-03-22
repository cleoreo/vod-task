/**
 * Configuration
 * @module config
 */

const config = {
  API_URL: 'https://accedo-ps-programming-exam.s3-ap-southeast-1.amazonaws.com',
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
};
/* istanbul ignore if */
if (process.env.APP_ENV === 'production') {
  config.API_URL = 'https://accedo-ps-programming-exam.s3-ap-southeast-1.amazonaws.com';
  config.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
}

export default config;
