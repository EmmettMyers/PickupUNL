const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded());
app.use(express.json());

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Legost8045.24219",
  database: "pickupunl"
});
con.connect(function(err) { if (err) throw err; });

app.post("/addPlayer", (req, res) => {
  var sql = "INSERT INTO signup (user,facility,sport,time) VALUES ('"+req.body.user+"','"+req.body.facility+"','"+req.body.sport+"','"+req.body.time+"')";
  con.query(sql, function (err, result) { if (err) throw err; });
});

app.post('/signups', function(req,res) {
  var sql = "SELECT user FROM signup WHERE facility='"+req.body.facility+"' AND sport='"+req.body.sport+"' AND time='"+req.body.time+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var JSONdata = JSON.stringify(result);
    res.send(JSONdata);
  });
});

app.post("/sendChat", (req, res) => {
  var sql = "INSERT INTO chats (sender,facility,sport,time,content) VALUES ('"+req.body.sender+"','"+req.body.facility+"','"+req.body.sport+"','"+req.body.time+"','"+req.body.content+"')";
  con.query(sql, function (err, result) { if (err) throw err; });
});

app.post('/chats', function(req,res) {
  var sql = "SELECT sender,content FROM chats WHERE facility='"+req.body.facility+"' AND sport='"+req.body.sport+"' AND time='"+req.body.time+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var dataToSendToClient = result;
    var JSONdata = JSON.stringify(dataToSendToClient);
    res.send(JSONdata);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// 469125913767-anivgegafs9cka1gr8u0msqiso1citje.apps.googleusercontent.com