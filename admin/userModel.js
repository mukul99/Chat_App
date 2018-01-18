var mongoose = require("mongoose");

var schemaOptions = {
  collection: "users"
};

var schema = new mongoose.Schema({
  alias: { type: String, required: true },
  roles: [String],
  contact: {
    phone: String,
    email: String
  },
  address: {
    lines: [String],
    city: String,
    state: String,
    zip: Number
  }
}, schemaOptions);

module.exports = mongoose.model("user", schema);

