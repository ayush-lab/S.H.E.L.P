const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // importing mongoose
const multer = require('multer');

const signupRoute = require('./routes/signup'); //importing signup route
const errorController = require('./controllers/error');
const feedRoutes = require('./routes/feed');
const createCourse = require('./routes/creator')
//const resendOtp = require()

const app = express();

const port = 8080 //whatever is in the environment variable PORT or 3000

const fileStorage = multer.diskStorage({ //for multer storage
    //these are two functions which are called by multer for incoming file
    destination: (req, file, cb)=> {
        cb(null,'images'); // null tells the call backs that its ok to store the file because that place is for error
    },
    filename:(req, file, cb)=> {
        cb(null,new Date().toDateString() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);  //if we want to store that file
    }
    else{
        cb(null,false); //if we dont want to store that file
        console.log("wrong file type");
    }
};


const fileStoragevideo = multer.diskStorage({ //for multer storage
    //these are two functions which are called by multer for incoming file
    destination: (req, file, cb)=> {
        cb(null,'videos'); // null tells the call backs that its ok to store the file because that place is for error
    },
    filename:(req, file, cb)=> {
        cb(null,new Date().toDateString() + "-" + file.originalname);
    }
});
const fileFiltervideo = (req, file, cb) => {
    if(file.mimetype === 'video/mp4'){
        cb(null,true);  //if we want to store that file
    }
    else{
        cb(null,false); //if we dont want to store that file
        console.log("wrong file type");
    }
};



app.use(bodyParser.json()); // For parsing the incoming json file from the client
app.use(multer({storage:fileStoragevideo,fileFilter:fileFiltervideo}).single('video'));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));


app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
    res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
    res.setHeader('Accces-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
    res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
    next();
})

app.use(signupRoute); //For signUp route
app.use(createCourse);
//app.use(resendOtp);
app.use(feedRoutes);// for dummy data 

app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
}) 
app.use('/',errorController.error404);


mongoose.connect('mongodb+srv://Abhishek_Srivas:Pagalworld@cluster0.0sntl.mongodb.net/Database?retryWrites=true&w=majority')
.then(result =>{
    app.listen(port);
    console.log("server started");
})
.catch(err =>{
    console.log(err);
})