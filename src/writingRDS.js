"use strict";

  const mysql = require("mysql");

module.exports.writing = async (event, context, callback) => {
  const messageId = event.Records[0].messageId.toString();
  console.log(messageId);
  const message = JSON.parse(event.Records[0].body);
  const city = message.name.toString();
  const country = message.sys.country.toString();
  const description = message.weather[0].description.toString();
  const temp = parseInt(message.main.temp.toFixed(0));
  const temp_min = parseInt(message.main.temp_min.toFixed(0));
  const temp_max = parseInt(message.main.temp_max.toFixed(0));
    
  console.log(message);
  // if (message !== null) {
    var connection = mysql.createConnection({
      host     : 'masterdb.cqnfhoewhffm.us-east-1.rds.amazonaws.com',
      user     : '${param:DBUser}',
      password : '${param:DBPass}',
      database : '${param:DBName}'
    });
    connection.connect();
    connection.query(`INSERT INTO mentorship.WeatherApp ( City, Country, Description, Temperature, Temp_min, Temp_max) VALUES ('Prilep', 'MK', 'Sunny', 4, 2, 5);` , [city, country, description, temp, temp_min, temp_max], function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
    connection.end();
  // }
     
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "SQS Lambda Trigger",
        input: event,
      },
      null,
      2
    ),
  };
};