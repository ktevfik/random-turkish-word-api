const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  _id: {
    type: Number
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;