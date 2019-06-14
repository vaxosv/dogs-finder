// var cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
let pug = require('pug');
const app = express();
const bodyParser = require('body-parser');

const mainRouter = require("./router/mainRouter");

const port = 3000;

let dbs = "mongodb+srv://vaxosv:qweasd123@cluster0-mx7yt.mongodb.net/dogs?retryWrites=true";
mongoose.connect(dbs, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', ()=> {console.log("connected to database")});
db.on("error", (err)=>console.log(err));

app.use(express.json());
// app.use(cors());

app.set('view engine', "pug");
app.set('views', path.join(__dirname, "views"));
app.use('/public', express.static('public'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




app.use('/', mainRouter);





app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${port}!`));