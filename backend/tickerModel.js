const mongoose = require('mongoose')

const tickerSchema = new mongoose.Schema({
  name: { type: String,  maxLength: 50, minlength: 1 },
  last: {type :Number },
  buy: {type :Number },
  sell: {type :Number },
  volume: {type :Number },
  base_unit: {type :String },
})

const Ticker = mongoose.model("Ticker", tickerSchema);
module.exports = Ticker;