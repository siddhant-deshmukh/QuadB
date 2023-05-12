const mongoose = require('mongoose')

const tickerSchema = new mongoose.Schema({
  base_unit: {type :String, require: true, unique:true },
  name: { type: String,  maxLength: 50, minlength: 1 },
  last: {type :Number },
  buy: {type :Number },
  sell: {type :Number },
  volume: {type :Number },
})

const Ticker = mongoose.model("Ticker", tickerSchema);
module.exports = Ticker;