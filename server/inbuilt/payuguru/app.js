let express = require('express');
let app = express();
let port = 7028;

//rout for express
app.get('/',(req,res) =>{
    res.send('hii from express server')
})

//rout for location
app.get('/location',(req,res) =>{
    res.send('hii from location')
})

app.listen(port,(err) =>{
    if(err) throw err;
    console.log(`server is running on port ${port}`);
})