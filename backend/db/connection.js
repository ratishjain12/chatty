const mongoose = require("mongoose");
function dbconnect(url) {
  try {
    mongoose.connect(url);
    console.log("db connected!!!");
  } catch (e) {
    console.log("error in connecting db: ", e);
  }
}

module.exports = { dbconnect };
