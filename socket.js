var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Legost8045.24219",
  database: "pickupunl"
});
con.connect(function(err) { 
    if (err) throw err; 
    console.log('sql connected'); 
});

const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('signup', (sign) =>     {
        var sql = "INSERT INTO signup (user,facility,sport,time) VALUES ('"+sign[0]+"','"+sign[1]+"','"+sign[2]+"','"+sign[3]+"')";
        con.query(sql, function (err, result) { if (err) throw err; });
        io.emit('signup', `${sign[0]}` );   
    });

    socket.on('message', (msg) =>     {
        var sql = "INSERT INTO chats (sender,facility,sport,time,content) VALUES ('"+msg[0]+"','"+msg[1]+"','"+msg[2]+"','"+msg[3]+"','"+msg[4]+"')";
        con.query(sql, function (err, result) { if (err) throw err; });
        io.emit('message', `${msg[0]}` );   
    });

    socket.on('getChats', (cts) =>     {
        var sql = "SELECT sender,content FROM chats WHERE facility='"+cts[0]+"' AND sport='"+cts[1]+"' AND time='"+cts[2]+"'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          var dataToSendToClient = result;
          var JSONdata = JSON.stringify(dataToSendToClient);
          io.emit('getChats', `${JSONdata}` );   
        });  
    });

    socket.on('getSignups', (pys) =>     {
        var sql = "SELECT user FROM signup WHERE facility='"+pys[0]+"' AND sport='"+pys[1]+"' AND time='"+pys[2]+"'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          var JSONdata = JSON.stringify(result);
          io.emit('getSignups', `${JSONdata}` );
        });
    });

    socket.on('search', (par) =>     {
      var sql;
      sql = "SELECT * FROM signup WHERE ";
      if (par[0])
        sql += " sport='"+par[0]+"'";
      if (par[1])
        (par[0]) ? sql += " AND time='"+par[1]+"'" : sql += " time='"+par[1]+"'";;
      if (par[2]){
        var insert = "";
        if (par[2] == "out") insert = "NOT ";
        (par[0]||par[1]) ? sql += " AND facility "+insert+"LIKE '%Recreation%'" : sql += " AND facility "+insert+"LIKE '%Recreation%'";
      }
      if (!par[0] && !par[1] && !par[2])
        sql = "SELECT * FROM signup";
      con.query(sql, function (err, result) {
        if (err) throw err;
        var peoplePlaces = [];
        for (var x = 0; x < result.length; x++){
          var placeObj = [result[x].facility, result[x].time, result[x].sport];
          var y = 0;
          if (peoplePlaces.length == 0){
            peoplePlaces.push(placeObj);
          } else {
            for (var y = 0; y < peoplePlaces.length; y++){
              if (JSON.stringify(peoplePlaces[y]) === JSON.stringify(placeObj)) break;
              else if (y == peoplePlaces.length-1) peoplePlaces.push(placeObj);
            }
          }
        }
        io.emit('getSearch', peoplePlaces);
      });
  });

});

http.listen(8080, () => console.log('listening on http://localhost:8080') );

/*const express = require('express');
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
con.connect(function(err) { if (err) throw err; console.log('sql connected'); });

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

app.listen(port, () => console.log(`Listening on port ${port}`));*/

// 469125913767-anivgegafs9cka1gr8u0msqiso1citje.apps.googleusercontent.com