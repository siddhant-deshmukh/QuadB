const dotenv = require('dotenv')
const Ticker = require('./tickerModel')

dotenv.config();

const admin_password = process.env.PASSWORD

async function checkIfAdmin(req, res, next) {
  try {
    const { password } = req.body
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ msg: 'admin password required' })
    }
    if (password !== admin_password) {
      return res.status(401).json({ msg: 'Incorrect password' })
    }
    next()
  } catch (err) {
    return res.status(500).json({ msg: "Some error occured", err })
  }
}

async function getTickerData(req, res) {
  try {
    const base_unit = req.params.base_unit
    if (!base_unit) {
      return res.status(400).json({ msg: 'no base_unit' })
    }
    const data = await Ticker.find({ base_unit })
    if (data.length === 0) {
      return res.status(404).json({ msg: 'unit not found' })
    }
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ msg: "Some error occured", err })
  }
}

async function getAllTickersData(req, res) {
  try {
    const data = await Ticker.find({})
    if (data.length === 0) {
      return res.status(404).json({ msg: 'unit not found' })
    }
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ msg: "Some error occured", err })
  }
}

async function updateTickersData(req, res) {
  try {
    const data = await fetch('https://api.wazirx.com/api/v2/tickers?limit=10').then((res) => res.json())
    const keys = Object.keys(data).slice(0, 10)
  
    const promiseArr = keys.map(async (key) => {
      let obj = data[key]
      if (!obj || !obj.name) return null;
  
      return Ticker.findOneAndUpdate({ base_unit: obj.base_unit }, {
        name: obj.name,
        last: parseFloat(obj.last),
        buy: parseFloat(obj.buy),
        sell: parseFloat(obj.sell),
        volume: parseFloat(obj.volume),
      }, {
        upsert: true,
      })
    })
    await Promise.all(promiseArr)
    
    return res.status(200).json({ msg: "Successfull" })
  } catch (err) {
    return res.status(500).json({ msg: "Some error occured", err })
  }
}

module.exports = {
  checkIfAdmin,
  getTickerData,
  getAllTickersData,
  updateTickersData,
}