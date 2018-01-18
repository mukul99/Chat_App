var mongoose = require("mongoose");

var schemaOptions = {
  collection: "rooms"
};

var schema = new mongoose.Schema({
  name: {type: String, required: true}
}, schemaOptions);

module.exports = mongoose.model("room", schema);

