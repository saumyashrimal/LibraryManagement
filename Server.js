const express = require('express');
const app = express();
require('dotenv').config();



const booksApis = require("./APIS/booksApis");
const userApis = require("./APIS/userApis");
// const adminApis = require("./APIS/adminApis");

//import mongo client
const mongoClient = require("mongodb").MongoClient;

const dburl = process.env.DATABASE_URL;

mongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        console.log('error in db connection', err);
    }
    else{
        //cretae database obj
        let databaseObj = client.db("LibraryManagement");

        // create collection obj
        let bookCollection = databaseObj.collection('bookscollection');
        let userCollection = databaseObj.collection('userCollection');

        // when making api calls - we get the the collections in req object
        app.set('bookCollection', bookCollection);
        app.set('userCollection', userCollection);
    }

});

app.use('/books',booksApis); 
app.use('/user',userApis);
// app.use('/admin',adminApis);

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`server is listening to port ${port}.....`));



