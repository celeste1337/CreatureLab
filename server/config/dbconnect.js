const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const connectionStr = "mongodb+srv://dbadmin:L5J1QMP3s6arJ6dh@cluster0.soskd.mongodb.net/CreatureLab?retryWrites=true&w=majority";

const client = new MongoClient(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConnection;

module.exports = {
    //try to connect to the db
    connectToServer: function(callback) {
        client.connect(function(err, db) {
            //if db connection is bad
            if(err || !db) {
                return callback(err);
            }

            //connect to OUR db
            dbConnection = db.db("CreatureLab");
            console.log("successfully connected qB)");
            return callback();
        })
    },
    getDb: () => dbConnection,
}