const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost/postdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

  const db = mongoose.connection

  module.exports = db