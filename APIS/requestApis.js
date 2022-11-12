const exp = require('express');
const requestApis = exp.Router();
const expressErrorHandler = require("express-async-handler");
require('dotenv').config();
let mongodb = require("mongodb");

//body parser middleware
requestApis.use(exp.json());

// create a request - used by user
requestApis.post("/createRequest", expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let requestObj = req.body;
    await requestCollection.insertOne(requestObj);
    res.status(200).send({
        message:"request created!"
    });
}));


// update request status - used by admin
requestApis.put("/updateRequestStatus", expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {id,status} = req.query;
    console.log(id, status);
    let objId = new mongodb.ObjectId(id);
    await requestCollection.updateOne({_id: objId}, {$set: {status:status}});
    res.status(200).send({
        message:"status updated!"
    });
}))

// delete request - used by user
requestApis.delete("/deleteRequest", expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {id} = req.query;
    let objId = new mongodb.ObjectId(id);
    await requestCollection.deleteOne({_id: objId});
    res.status(200).send({
        message:"request Deleted"
    });
}));




// search request by roll number - used by admin
requestApis.get("/searchRequest",  expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {rollno,status} = req.query;
    let requests =  await requestCollection.find({rollno: rollno, status: status}).toArray();
    if(requests.length === 0){
        res.status(404).send({
            message: "No Requests found!"
        })
    }
    res.status(200).send({
        message:"Requests Found",
        response: requests
    });
}));


module.exports = requestApis;