const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const { getTickerData, getAllTickersData, checkIfAdmin, updateTickersData } = require('./tickerController')

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("trust proxy", 1);
// ['http://localhost:5173/','http://localhost:5174/']

let url = process.env.CLIENT_URL_1

app.use(cors({ url, credentials: true, optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false, limit: '1kb' }));
app.use(express.json({ limit: '5kb' })) // limit the size of incoming request body and parse i.e convert string json to js object for every incoming request

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log("Connected to database") })
  .catch((err) => { console.error("Unable to connect database", err) })


app.get('/', getAllTickersData)
app.get('/:base_unit', getTickerData)
app.post('/',checkIfAdmin, updateTickersData)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});