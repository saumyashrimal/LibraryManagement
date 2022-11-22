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
    let bookCollection = req.app.get('bookCollection');
    let requestObj = {...req.body,};
    
    let bookDetails = await bookCollection.findOne({isbn:requestObj.isbn});
    requestObj.bookDetails = bookDetails;
    await requestCollection.insertOne(requestObj);
    res.status(200).send({
        message:"request created!"
    });
}));


// update request status - used by admin
requestApis.put("/updateRequestStatus", expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {reqId,status} = req.body;
    console.log("update api",reqId, status);
    let objId = new mongodb.ObjectId(reqId);
    await requestCollection.updateOne({_id: objId}, {$set: {status:status}});
    res.status(200).send({
        message:"status updated!"
    });
}))

// delete request - used by user
requestApis.delete("/deleteRequest", expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {reqId} = req.query;
    console.log("reqId",reqId);
    let objId = new mongodb.ObjectId(reqId);
    await requestCollection.deleteOne({_id: objId});
    res.status(200).send({
        message:"request Deleted"
    });
}));




// search request by roll number - used by admin
requestApis.get("/searchRequest",  expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {rollno,status,isbn} = req.query;
    let requests =  await requestCollection.find( {
        $or: [
          { rollno: { $regex: `${rollno}`, $options: "i" } },
          { status: { $regex: `${status}`, $options: "i" } },
          { isbn: { $regex: `${isbn}`, $options: "i" } },
        ],
      }).toArray();
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

// get all requests 
requestApis.get("/getAllRequests",  expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let requests =  await requestCollection.find().toArray();
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

// issue books
requestApis.post("/issueBook",  expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let bookCollection = req.app.get('bookCollection');
    let {reqId, newQty, isbn} = req.body;
    let objId = new mongodb.ObjectId(reqId);
    let currentTime = new Date();
    await requestCollection.updateOne({_id: objId}, {$set: {status: "approved", updateRequestDate: currentTime}});
    await bookCollection.updateOne({isbn:isbn}, {$set: {totalQty: newQty}});
    res.status(200).send({
        message: "Book Issued"
    })
    
}));


// unissue book
requestApis.post("/unissueBook",  expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let bookCollection = req.app.get('bookCollection');
    let {reqId, newQty, isbn} = req.body;
    let currentTime = new Date();
    let objId = new mongodb.ObjectId(reqId);
    requestCollection.updateOne({_id: objId}, {$set: {status: "returned", updateRequestDate: currentTime}});
    await bookCollection.updateOne({isbn:isbn}, {$set: {totalQty: newQty}}); 
    res.status(200).send({
        message: "Book Returned"
    })
}));

//Reject Request
requestApis.put("/rejectRequest", expressErrorHandler(async (req,res) => {
    let requestCollection = req.app.get('requestCollection');
    let {reqId} = req.body; 
    let currentTime = new Date();
    let objId = new mongodb.ObjectId(reqId);
    requestCollection.updateOne({_id: objId}, {$set: {status: "rejected", updateRequestDate: currentTime}});
    res.status(200).send({
        message: "Book Rejected"
    })
}))

module.exports = requestApis;