const mongoose = require("mongoose");
require('dotenv').config();

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set("debug", true);
  }

  mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
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
