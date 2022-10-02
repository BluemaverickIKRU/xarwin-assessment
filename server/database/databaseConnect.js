const mongoose = require('mongoose');

const url = `mongodb+srv://maverick:123@cluster0.rcnadu3.mongodb.net/Xarwin?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = () => {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log('Connected to the database ');
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    });
};

module.exports = { connectDb };
