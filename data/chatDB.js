var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var mongoose = require("mongoose");
//var Logger = require("mongodb").Logger;

var url = "mongodb://localhost:27017/chat";
var connect = MongoClient.connect(url);

mongoose.Promise = global.Promise;
mongoose.connect(url);

//Logger.setLevel("debug");
//mongoose.set('debug', true);

var User = require("../admin/userModel");
var Room = require("../admin/roomModel");

module.exports = {
  connect,
  User,
  Room,
  close: function () {
    connect.then(db => db.close());
    mongoose.disconnect();
  }
};
