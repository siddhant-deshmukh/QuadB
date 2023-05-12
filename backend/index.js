const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const Ticker = require('./tickerModel')

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("trust proxy", 1);
// ['http://localhost:5173/','http://localhost:5174/']

const origin = []
let url1 = process.env.CLIENT_URL_1
let url2 = process.env.CLIENT_URL_2
let url3 = process.env.CLIENT_URL_3
let url4 = process.env.CLIENT_URL_4
if (url1) origin.push(url1)
if (url2) origin.push(url2)
if (url3) origin.push(url3)
if (url4) origin.push(url4)

// console.log(origin)
// app.use()
app.use(cors({ origin, credentials: true, optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false, limit: '1kb' }));
app.use(express.json({ limit: '20kb' })) // limit the size of incoming request body and parse i.e convert string json to js object for every incoming request

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log("Connected to database") })
  .catch((err) => { console.error("Unable to connect database", err) })


app.get('/',async (req,res)=>{
  const data = await Ticker.find({})
  return res.status(200).json({data})
})


app.get('/update-the-data',async (req,res)=>{
  const data =  await fetch('https://api.wazirx.com/api/v2/tickers?limit=10').then((res)=>res.json())
  const keys = Object.keys(data).slice(0,10)
  
  const promiseArr = keys.map(async (key)=>{
    let obj = data[key]
    console.log(key, obj)
    console.log()
    if(!obj || !obj.name) return null;
    return Ticker.create({
      name : obj.name,
      last : parseFloat(obj.last) ,
      buy: parseFloat(obj.buy), 
      sell : parseFloat(obj.sell),
      volume : parseFloat(obj.volume), 
      base_unit :obj.base_unit
    })
  })
  const arr = await Promise.all(promiseArr)
  console.log()

  return res.status(200).json(arr)
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});