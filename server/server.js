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
    //start server
    
});

const routes = require('./routes/endpoints');

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(routes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build/")));
	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "../client/build/", "index.html"));
	});
}



app.listen(port, () => {
    console.log('app is listening on port '+port)
})