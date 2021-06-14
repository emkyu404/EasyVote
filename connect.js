var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "easyvote"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM administrateur", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});