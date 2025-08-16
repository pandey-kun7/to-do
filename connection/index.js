const mongoose = require("mongoose");

async function DBConnection(url) {
  mongoose
    .connect(`${url}/to-do-app`)
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((err) => {
      console.log(`Error:${err}`);
    })
    .finally(() => console.log("DB connection is secured"));
}

module.exports = DBConnection