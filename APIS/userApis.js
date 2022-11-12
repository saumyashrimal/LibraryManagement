// create mini  express api
const exp = require('express');
const userApis = exp.Router();
const bcryptjs = require("bcryptjs");
const expressErrorHandler = require("express-async-handler");
const login = require("./Middlewares/login");
const serverContants = require('./constants');

require('dotenv').config();

//body parser middleware
userApis.use(exp.json());

 // create user
 userApis.post("/createUser",expressErrorHandler( async (req, res) => {
    let userCollectionObj = req.app.get("userCollection");
    //get user obj
    let newUser =  req.body;
    //seach for existing user
    let existinguser = await userCollectionObj.findOne({ rollno: newUser.rollno });
    //if user exist
    if(existinguser !== null){
        res.send({ message: "User already existed" })
    }
    else{
        //hash the password before inserting 
        let hashedPassword = await bcryptjs.hash(newUser.password,parseInt(process.env.HASH_COUNT));
        //replace the plainpassword with hashed password
        newUser.password = hashedPassword;
        //insert new user
        await userCollectionObj.insertOne(newUser);
        res.status(200).send({ message: "User created" })
    }
}));


 // login user
 userApis.post("/login",login, expressErrorHandler(async (req,res,next) => {
 }));

// update fields in api
 userApis.put("/updateField", expressErrorHandler(async (req,res) => {
    let userCollection = req.app.get("userCollection");
    // type -> name, phone number, email
    let {type, newValue , rollno} = req.body;
    await userCollection.updateOne({rollno: rollno} ,{$set: {[`${type}`]: newValue }});
    res.status(200).send({
        message: `${type} is updated!`
    });
 }));



 // Books array  update api - >  in user
 userApis.put("/updateUserBooks", expressErrorHandler(async (req,res) => {
    let userCollection = req.app.get("userCollection");
    let issueDate = new Date();
    let returnDate = new Date();
    returnDate.setDate(issueDate.getDate() + serverContants.bookIssueTime);
    let {rollNo, isbn} = req.query;
    let bookObj = {
        isbn,
        issueDate: issueDate,
        returnDate: returnDate
    };
    //find if user Exist
    let user = await userCollection.findOne({rollno: rollNo});
    if(user === null){
        res.status(404).send({
            message: "User Not found!"
        })
    };
    await userCollection.updateOne({rollno: rollNo}, {$push: {issuedBooks: bookObj}});
    res.status(200).send({
        message: "Book Issued"
    });
 }));

// delete issued books from user
userApis.put("/removeIssuedBook", expressErrorHandler(async (req,res) => {
    let userCollection = req.app.get("userCollection");
    let {rollNo, isbn} = req.query;
    //find if user Exist
    let user = await userCollection.findOne({rollno: rollNo});
    let issuedBooks = user.issuedBooks.filter((bookObj) => {
        bookObj.isbn !== isbn
    });
    if(user === null){
        res.status(404).send({
            message: "User Not found!"
        })
    };
    await userCollection.updateOne({rollno: rollNo}, {$set: {issuedBooks: issuedBooks}});
    res.status(200).send({
        message: "Books updated"
    });
 }))


 // get all users





 module.exports = userApis;
