const mongoose = require("mongoose");
require('dotenv').config();

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set("debug", true);
  }

  mongoose.connect("mongodb://root:1234@127.0.0.1:27017/admin", {
    dbName: "kwic",
  });
};

mongoose.connection.on('error', (error) => {
  console.error("mongodb 연결 에러", error);
  connect();
});

mongoose.connection.on("disconnected", () =>
  console.error('mongodb 연결종료됨')
);

connect();

module.exports = {
  connect,
};
