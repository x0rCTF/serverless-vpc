'use strict';

const AWS = require('aws-sdk'); 
const sns = new AWS.SNS();

module.exports.filter = (event,context,callback) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
    console.log(message)
    if (message.main.temp > 10) {
        var params = {
            Message: 
            "Hello from G2 Weather Station 👋 \n" +
            `In ${message.name.toString()}, ${message.sys.country.toString()}\n` +
            `the current 🌡️ is ${message.main.temp.toFixed(0)} degrees, but feels like real feel ${message.main.feels_like.toFixed(0)}\n` +
            `Today we expect highest temperature of ${message.main.temp_min.toFixed(0)}, lowest ${message.main.temp_max.toFixed(0)} \n` +
            "Have a good day!"
          , 
            TopicArn: 'arn:aws:sns:us-east-1:073045235439:SNSEMAIL'
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
  } else if (message.main.temp < 10) {
    var params = {
        Message: 
        "Hello from GR2 WeatherApp 👋 \n" +
        `The weather in ${message.name.toString()} ${message.sys.country.toString()} is ${message.weather[0].description.toString()} \n` +
        `The current temperature is ${message.main.temp.toFixed(0)} 🌡️, real feel like ${message.main.feels_like.toFixed(0)} 😊\n` +
        `Today we expect minimal temperature of ${message.main.temp_min.toFixed(0)} 🌡️ and maximum of ${message.main.temp_max.toFixed(0)} 🌡️.\n` +
        "A positive mindset brings positive things. Have a good day!"
      , 
        TopicArn: 'arn:aws:sns:us-east-1:073045235439:SNSEMAIL'
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
  } else if (message.main.temp <= 0) {
    var params = {
        Message: 
        "Hello from OpenWeatherMap \n" +
        `You have new weather notification with "id": ${message.id.toFixed(0)},\n` +
        `The current temperature in "city": ${message.name.toString()},\n` +
        `"country": \"${message.sys.country.toString()}\",\n` +
        `Is with "description": \"${message.weather[0].description.toString()}\",\n` +
        `Where the current "temperature": ${message.main.temp.toFixed(0)} Celsius,\n` +
        `But it "feels_like": ${message.main.feels_like.toFixed(0)} Celsius,\n` +
        `Current day expected "temp_min": ${message.main.temp_min.toFixed(0)} Celsius ,\n` +
        `Current day expected "temp_max": ${message.main.temp_max.toFixed(0)} Celsius,\n` +
        "The Temperature is below or equal to zero, don't forget your your winter jacket"
      , 
        TopicArn: 'arn:aws:sns:us-east-1:073045235439:SNSEMAIL'
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
  }
};