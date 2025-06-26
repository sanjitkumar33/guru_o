let fs = require('fs');

// write file
/*
fs.writeFile('myFile.txt', 'this is about node code', function(){
    console.log('File created')
})
*/

// append file
/*
fs.appendFile('mycode.txt','my code for append one\n', function(){
    console.log('File appended')
})
*/

// read file
/*
fs.readFile('myLoc.json','utf-8',(err,data) => {
    if(err) throw err;
    console.log(data)
})
*/
//rename
/*
fs.rename('myFile.txt','myData.txt',function(err){
    if(err) throw err;
    console.log('File renamed')
})
*/
//delete
fs.unlink('myData.txt',(err) => {
    if(err) throw err;
    console.log('File delete')
})

