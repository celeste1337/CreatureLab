//middleware file - just kinda defines the endpoints and does the db querying :D

const express = require("express");
const dbo = require('../config/dbconnect');
const path = require('path');
const ObjectID = require("bson-objectid");
//instance of the router
const routes = express.Router();

routes.route("/getAllBodyParts").get(async (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("bodyparts")
        .find()
        .toArray((err, result) => {
            if(err) {
                res.status(400).send("error fetching the guys")
            } else {
                res.json(result);
                console.log("result sent")
            }
        })
})

routes.route("/getAllCreatures").get(async (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("completedcreatures")
        .find({}, {projection:{
            "creatureid": 1,
            "data.imageData": 1,
            "data.borderColor": 1,
            "_id": 0
        }})
        .toArray(function(err, result) {
            if(err) {
                res.status(400).send("error fetching the guys")
            } else {
                res.json(result);
            }
        })
})

routes.route("/getInitialCreature").get((req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection("completedcreatures")
    .find({})
    .limit(3)
    .toArray((err, result) => {
        if(err) {
            res.status(400).send("error fetching the guys")
        } else {
            //console.log(result);
            res.json(result);
        }
    })
})

routes.route("/getSomeCreatures/:objId").get(async (req, res) => {
    const lastObjId = ObjectID(req.params.objId);
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("completedcreatures")
        .find({ _id: { $gt: lastObjId}},  { projection: {
            "creatureid": 1,
            "data.imageData": 1,
            "data.borderColor": 1,
            "_id": 1}})
        .limit(8)
        .toArray(function(err, result) {
            if(err) {
                res.status(400).send("error fetching the guys")
            } else {
               // console.log(result);
                res.json(result);
            }
        })
})

routes.get("/getPart/:id", async (req, res, next) => {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("bodyparts")
        .findOne({creatureid: req.params.id})
        .then((result) => {
            res.json(result);
            next();
        })
        .catch(err => console.log(err));
});

routes.get("/find/:id", (req, res, next) => {
    //the req body should contain a bool that determines what table to search in
    const dbConnect = dbo.getDb();
    const searchTermArr = req.params.id.split("");
    let numHyphens = searchTermArr.filter((letter) => letter === "-")

    if(numHyphens.length >= 2) {
        //we can assume its a full length code
        dbConnect
        .collection("completedcreatures")
        .find({creatureid: req.params.id})
        .toArray((err, result) => {
            if(err) {
                res.status(400).send("error fetching the guys")
            } else {
                res.json(result);
                next();
            }
        })
    } else {
        //anything that has their code
        let returnArr = [];
       
        dbConnect.collection("bodyparts")
        .find({creatureid: req.params.id})
        .toArray()
        .then((arr) => {
            returnArr.push(arr);;
        })
        .then(() => {
            dbConnect.collection("completedcreatures")
            .find({creatures: req.params.id})
            .toArray()
            .then((arr) => {
                returnArr.push(arr);
                returnArr = returnArr.flat();
                res.json(returnArr);
            })
        })
        
        
    }
});

routes.route("/savePart").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection("bodyparts")
        .insertOne({
            creatureid: req.body.id,
            type: req.body.type,
            data: req.body.data,
            createdOn: req.body.createdOn
        });
    
    const cursor = dbConnect.collection('bodyparts').find({creatureid: req.body.id})
    res.json(cursor);
    //
});

routes.route("/saveCreature").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection("completedcreatures")
        .insertOne({
            creatureid: req.body.creatureid,
            creatures: req.body.creatures,
            data: req.body.data,
            createdOn: req.body.createdOn
        });
    
    const cursor = dbConnect.collection('completedcreatures').find({creatureid: req.body.id})
    res.json(cursor);
    //
});

routes.route("/getRandomPart/:bodyPart").get(async (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect.collection("bodyparts")
    .aggregate([
        //match certain trait
        //
        {$match: {type:req.params.bodyPart}},
        {$sample: {size:1}}
    ])
    .toArray((err, result) => {
        if(err) {
            res.status(400).send("error fetching the guys")
        } else {
            res.json(result);
        }
    })
    //
});

module.exports = routes;
