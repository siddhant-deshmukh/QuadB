# Crypto Dashboard

This app is inspired from https://hodlinfo.com/ where it shows the crypto currency rate from WazirX api.

Used Express.js, MongoDB, React.js.

![Overview of App](/quadB.gif)



I have created three routes:
```
app.get('/', getAllTickersData)
app.get('/:base_unit', getTickerData)
app.post('/',checkIfAdmin, updateTickersData)
```
1. app.get('/', getAllTickersData)
   * to get data from 10 results

2. app.get('/:base_unit', getTickerData)
   * to get data about specific currency/base_unit

3. app.post('/',checkIfAdmin, updateTickersData)
   * first this will call **middleware** *'checkIfAdmin'* which will check if the password sended in req.body is equal to the password in .env file.
   * this will call the external WazirX api and get the top 10 results.
   * add upload this results to mongodb collection, if already uploaded it will update the existing data.