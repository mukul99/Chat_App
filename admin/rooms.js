var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var ObjectID = require("mongodb").ObjectID;
var chatDB = require("../data/chatDB");

var router = express.Router();
module.exports = router;

router.get('/', function (req, res, next) {

  chatDB.connect
    .then(db => db.collection("rooms").find().toArray())
    .then(rooms => {
      res.render("rooms/list", {
        title: "Admin Rooms",
        rooms: rooms
      });
    })
    .catch(next);

});

router.route('/add')
  .get(function (req, res) {
    res.render("rooms/add");
  })
  .post(function (req, res, next) {
    var room = {
      name: req.body.name
    };

    chatDB.connect
      .then(db => db.collection("rooms").insertOne(room))
      .then(result => res.redirect(req.baseUrl))
      .catch(next);

  });

router.route('/edit/:id')
  .all(function (req, res, next) {

    var roomId = req.params.id;
    var filter = {_id: new ObjectID(roomId)};

    chatDB.connect
      .then(db => db.collection("rooms").find(filter).next())
      .then(room => {
        if (!room) {
          res.sendStatus(404);
          return;
        }
        res.locals.room = room;
        next();
      })
      .catch(next);

  })
  .get(function (req, res) {
    res.render("rooms/edit");
  })
  .post(function (req, res, next) {
    var roomId = req.params.id;
    var filter = {_id: new ObjectID(roomId)};
    var newRoom = {
      name: req.body.name
    };

    chatDB.connect
      .then(db => db.collection("rooms").replaceOne(filter, newRoom))
      .then(result => res.redirect(req.baseUrl))
      .catch(next);
  });

router.get('/delete/:id', function (req, res, next) {
  var roomId = req.params.id;
  var filter = {_id: new ObjectID(roomId)};

  chatDB.connect
    .then(db => db.collection("rooms").deleteOne(filter))
    .then(result => res.redirect(req.baseUrl))
    .catch(next);
});
