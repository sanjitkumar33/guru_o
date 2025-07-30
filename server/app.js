let express = require('express');
let app = express();
let port = 7028;
let {dbConnect,db} = require('./controller/dbController')

//rout for express
app.get('/',(req,res) =>{
    res.send('hii from express server')
})

//rout for location
app.get('/location', async (req,res) =>{
    let query = {};
    let collection = "location"
    let output = await getData(collection, query)
    res.send(output)
})

app.listen(port,(err) =>{
    dbConnect()
    if(err) throw err;
    console.log(`server is running on port ${port}`);
})