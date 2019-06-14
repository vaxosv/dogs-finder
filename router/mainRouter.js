const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const PostSchema = require('../models/post');



router.get("/admin", (req, res) => {
    res.render("adminLogin")
});

router.post("/admin", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;


    if (username === "vaxosv" && password === "123"){
        PostSchema.find({}, (err, data)=>{
            if (!err){
                res.render("admin", {
                    arr: data
                })
            } else {console.log(err)}
        })
    }else{
        res.render("adminLogin")
    }

});


router.get('/admin/*', function (req, res, next) {
    next()
});

//
// router.get("/admin/list", (req, res) => {
//     PostSchema.find({}, (err, data)=>{
//         if (!err){
//             res.render("admin", {
//                 arr: data
//             })
//         } else {console.log(err)}
//     })
// });

router.post("/dell", (req, res) => {
    let removeItemId = req.body.id;
    PostSchema.deleteOne({_id: removeItemId}, function (err) {
        if (err) {return handleError(err)}
        console.log(removeItemId);
        res.sendStatus(200)
    });
    
});

router.get("/", (req, res) => {
    // fs.readdir("./public/uploads", (err, files) => {
    //    res.render("index", {
    //        arr: files
    //    })
    // });

    PostSchema.find({}, (err, data)=>{
        if (!err){ 
            res.render("index", {
                arr: data
            })
        } else {console.log(err)}
    })
});

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
}).single('fileToUpload');
//as manu as you wont uploads
//.any()


router.post("/add", upload, (req, res) => {
    let title = req.body.title;
    
    post = new PostSchema({
        title: title,
        url: req.file.path.toString()
    });


    upload(req, res, (err) => { 
        if (err) {
            console.log(err);
        } else {
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
            } else {
                post.save((err, a)=>{
                    if (!err){ 
                    } else {console.log(err);}
                });
                res.redirect("/")
            }
        }
    })    
});



module.exports = router;