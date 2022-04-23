//EXPRESS STUFF IN HERE :)
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbconnect = require('./config/dbconnect');
const bodyparser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();

//serveeeeee
app.use(cors());
app.use(bodyparser.raw({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use(express.static(path.join(__dirname, 'client', 'build')))
    // required to serve SPA on heroku production without routing problems; it will skip only 'api' calls
    if (process.env.NODE_ENV === 'production') {
      app.get(/^((?!(api)).)*$/, (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
      })
    }

const apiCalls = require('./routes/endpoints');
app.use('/api', apiCalls);

app.use(express.static(path.join(__dirname, '../build/')));
app.get('/', (req,res) =>{
    //res.json("hi")
    res.sendFile(path.join(__dirname+'../build/index.html'));
});

//err handling
app.use(function(err, _req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something went wrong.");
});

dbconnect.connectToServer(function(err) {
    if(err) {
        console.error(err);
        process.exit();
    }
    //start server
    app.listen(port, () => {
        console.log('app is listening on port '+port)
    })
});