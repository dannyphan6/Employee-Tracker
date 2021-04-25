const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sassygirl3991",
    database: "employee_trackerdb"
  });

connection.connect(function(err) {
    if (err) throw err
    console.log(`App listening on PORT ${connection.threadId}`)
    
});