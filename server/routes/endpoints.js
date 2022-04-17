//middleware file - just kinda defines the endpoints and does the db querying :D

const express = require("express");
const dbo = require('../config/dbconnect');
const path = require('path');

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
})

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

routes.route("/search").post(async (req, res) => {
    const dbConnect = dbo.getDb();

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
