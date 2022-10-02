const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalSchema = new Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  location: {
    type: String,
  },
  empId: {
    type: String,
  },
  uniqueId: {
    type: String,
  },
});

const personalModel = mongoose.model('PersonalInfo', personalSchema);

module.exports = personalModel;
