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

const io = require('socket.io')();
io.listen(5000, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on('createProfile', (cred) =>     {
    var sql = "SELECT * FROM profiles WHERE id='"+cred[0]+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length == 0){
        console.log("uye");
        sql = "INSERT INTO profiles (id,user,picture,age,competition,email,description) VALUES ('"+cred[0]+"','"+cred[1]+"','"+cred[2]+"',0,'','"+cred[3]+"','')";
        con.query(sql, function (err, result) { if (err) throw err; });
      }
    });  
  });

  socket.on('getProfile', (id) =>     {
    var sql = "SELECT * FROM profiles WHERE id='"+id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      var JSONdata = JSON.stringify(result);
      io.emit('showProfile', `${JSONdata}` );
    });    
  });

  socket.on('setProfile', (prof) =>     {
    var sql = "UPDATE profiles SET age='"+prof[1]+"', competition='"+prof[2]+"', description='"+prof[3]+"' WHERE id='"+prof[0]+"'";
    con.query(sql, function (err, result) { if (err) throw err; });    
  });

  socket.on('canSignup', (sign) =>     {
    var sql = "SELECT * FROM signup WHERE facility='"+sign[0]+"' AND sport='"+sign[1]+"' AND time='"+sign[2]+"' AND id='"+sign[3]+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      (result.length == 0) ? io.emit('showInteract', 'true') : io.emit('showInteract', 'false');
    });    
  });

  socket.on('signup', (sign) =>     {
    var sql = "SELECT * FROM signup WHERE facility='"+sign[1]+"' AND sport='"+sign[2]+"' AND time='"+sign[3]+"' AND id='"+sign[4]+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length == 0){
        sql = "INSERT INTO signup (user,facility,sport,time,id) VALUES ('"+sign[0]+"','"+sign[1]+"','"+sign[2]+"','"+sign[3]+"','"+sign[4]+"')";
        con.query(sql, function (err, result) { if (err) throw err; });
        io.emit('signup', `${sign[0]}` );
      }
    });    
  });

  socket.on('unSignup', (del) =>     {
    var sql = "DELETE FROM signup WHERE facility='"+del[0]+"' AND sport='"+del[1]+"' AND time='"+del[2]+"' AND id='"+del[3]+"'";
    con.query(sql, function (err, result) { 
      if (err) throw err; 
      io.emit('signup', 'deleted' );
    });  
  });

  socket.on('getSignups', (pys) =>     {
    var sql = "SELECT * FROM signup WHERE facility='"+pys[0]+"' AND sport='"+pys[1]+"' AND time='"+pys[2]+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      var JSONdata = JSON.stringify(result);
      io.emit('getSignups', `${JSONdata}` );
    });
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
      var JSONdata = JSON.stringify(result);
      io.emit('getChats', `${JSONdata}` );   
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

  socket.on('reset', () =>     {
    var sql = "DELETE FROM chats";
    con.query(sql, function (err, result) { if (err) throw err; });
    sql = "DELETE FROM signup";
    con.query(sql, function (err, result) { if (err) throw err; });
  });

});