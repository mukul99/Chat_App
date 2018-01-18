var MongoClient = require("mongodb").MongoClient;
var rooms = require(__dirname + "/rooms.json");

var url = "mongodb://localhost:27017/chat";
MongoClient.connect(url, function (error, db) {
  db.collection("rooms").find().toArray(function(error, rooms){
    if(error){
      console.error(error);
      return;
    }
    console.log(rooms);

    db.close();
  });
});