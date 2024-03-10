console.log("hello");
const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
// const database = 'danceweb';
// const collection = 'testscores';
// mongoose.use(database);
// mongoose.db.createCollection(collection);
// danceweb db we be created when we start the application
mongoose.connect('mongodb://127.0.0.1/danceweb', { useNewUrlParser: true });
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){console.log("conn estab")});

const my_schema = new mongoose.Schema({
    name: String,
age: String,
    gender: String,
    phno: String,

    text: String
    

});
const my_model = mongoose.model('my_model', my_schema);

// include this everytime so the/ data is parsed 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/static', express.static("static"));

app.get("/", (req, res) => {
    res.status(200).render('home.pug');
});

app.get("/contact", (req, res) => {
    res.status(200).render('contact.pug');
});



app.post("/contact", (req, res) => {
    var mydata = new my_model(req.body);
    mydata.save().then(() => {
        res.status(200).send("this item is saved to the database");
    }).catch(() => {
        res.status(400).send("this item was not saved to the database");
    })

});




app.listen(80, () => {
    console.log("Application started successfully at port 80...");
});