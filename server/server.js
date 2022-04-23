//EXPRESS STUFF IN HERE :)
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbconnect = require('./config/dbconnect');
const bodyparser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();

dbconnect.connectToServer(function(err) {
    if(err) {
        console.error(err);
        process.exit();
    }
    //start server
});

//serveeeeee
app.use(cors());
app.use(bodyparser.raw({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use(require('./routes/endpoints'));

app.use(express.static(path.join(__dirname, './../client/build/')));


app.listen(port, () => {
    console.log('app is listening on port '+port)
})