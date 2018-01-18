var users = require(__dirname + "/users.json");
var chatDB = require("./chatDB");

chatDB.User.insertMany(users)
  .then(() => {
    console.log("inserted!");
    chatDB.close();
  })
  .catch(error => {
    console.error(error);
  });
