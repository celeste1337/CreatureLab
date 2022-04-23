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

dbconnect.connectToServer(function(err) {
    if(err) {
        console.error(err);
        process.exit();
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); // serve the static react app
    app.get(/^\/(?!api).*/, (req, res) => { // don't serve api routes to react app
      res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
    console.log('Serving React App...');
  };

const apiCalls = require('./routes/endpoints');
app.use('/api', apiCalls);


//start server
app.listen(port, () => {
    console.log('app is listening on port '+port)
})