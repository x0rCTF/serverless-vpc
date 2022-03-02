// "use strict";

//   const mysql = require("mysql");
//   const database1 = require('./dbcon');

// module.exports.writing = async (event, context, callback) => {
//   console.log('write RDS lambda entered')
//   const messageId = event.Records[0].messageId.toString();
//   console.log(messageId);
//   const message = JSON.parse(event.Records[0].body);
//   const city = message.name.toString();
//   const country = message.sys.country.toString();
//   const description = message.weather[0].description.toString();
//   const temp = parseInt(message.main.temp.toFixed(0));
//   const temp_min = parseInt(message.main.temp_min.toFixed(0));
//   const temp_max = parseInt(message.main.temp_max.toFixed(0));
 
//   console.log(message);
//   console.log('writing RDS sending to RDS');

//   console.log('connection = ',database1);
//   // var query1 = database1.query(`INSERT INTO mentorship.WeatherApp ( City, Country, Description, Temperature, Temp_min, Temp_max) VALUES ('Prilep', 'MK', 'Sunny', 4, 2, 5);` , function (error, results, fields) 
//   var query1 = database1.query("INSERT INTO mentorship.WeatherApp ( City, Country, Description, Temperature, Temp_min, Temp_max) VALUES ('"+city+"', '"+country+"', '"+description+"', '"+temp+"', '"+temp_min+"', '"+temp_max+"');" , function (error, results, fields) 
//   {
//     if (error) 
//     {
//       console.log(error);
//       throw error;
//     }
//     console.log('The solution is: ', results[0].solution);
//   });
//   console.log('query1 = ', query1);

     
//   console.log('writing RDS end of function');
//   return {
//   statusCode: 200,
//   body: "success"
//   };

// };

"use strict";

module.exports.writing = async (event) => {
  const note = event.Records[0].body;
  console.log(note);
//   const messageId = JSON.parse(event.Records[0].messageId).toString();
  const message = JSON.parse(event.Records[0].body);
  const city = message.name.toString();
  const country = message.sys.country.toString();
  const description = message.weather[0].description.toString();
  const temp = parseInt(message.main.temp.toFixed(0));
  const temp_min = parseInt(message.main.temp_min.toFixed(0));
  const temp_max = parseInt(message.main.temp_max.toFixed(0));
  console.log(message);
 if (message !== null) {
 
  const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'masterdb.cqnfhoewhffm.us-east-1.rds.amazonaws.com',
    user     : 'root',
    password : 'supersecretpass',
    database : 'mentorship',
    debug    :  false
});

pool.query(`INSERT INTO mentorship.WeatherApp (City, Country, Description, Temperature, Temp_min, Temp_max) VALUES (?, ?, ?, ?, ?, ?);`, [city, country, description, temp, temp_min, temp_max], function (err, data) {
    if(err) {
        console.error(err);
        return;
    }
    // rows fetch
    console.log(data);
});
 }
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