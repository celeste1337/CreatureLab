//EXPRESS STUFF IN HERE :)

const express = require('express');
const path = require('path');

const app = express();

//serveeeeee
app.use(express.static(path.join(__dirname, 'client/build')));

//test endpoint
app.get('/api/test', (req, res) => {
    let test = "hi bestie!";
    res.json(test);
    console.log('sent test message');
});



// Handles any requests that don't match the ones above - defaults to index.html
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('app is listening on port '+port);