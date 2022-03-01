'use strict';

const AWS = require('aws-sdk'); 
const axios = require("axios");

const sns = new AWS.SNS();

module.exports.cron = async (event, context, callback) => {

  const openWeatherMapAPIURL = 'http://api.openweathermap.org/data/2.5/weather?q=prilep&appid=15ea876c6db456422c681b5ba377ec0a&units=metric';
  const currentWeather = await axios.get(openWeatherMapAPIURL).catch(error => {
    console.log(error);
    return;
  });
  // const requestBody = JSON.parse(currentWeather.data);
  console.log(currentWeather);
  var params = {
    Message: JSON.stringify(currentWeather.data),
    TopicArn: 'arn:aws:sns:us-east-1:073045235439:myWeatherTopic'
  };

  sns.publish(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'SYSTEM: Couldn\'t add the message due an internal error. Please try again later.',
      });
    }
    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify({ SYSTEM: 'Message sent to SNS' }),
    };
    callback(null, response);
  });


};