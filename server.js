require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const colors = require('colors');
// const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');




connectDB();

const app = express();

app.use(cors({origin: true}))
app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
/////////////////////////////////////////////////////////////////////////////
const multer  = require('multer')

// setup multer for file upload
var storage = multer.diskStorage(
    {
        destination: './images',
        // destination: (req, file, cd)=>{
        //     cb(null, DIR);
        // },
        filename: function (req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({ storage: storage } )
app.use(express.static(__dirname + "/../build"));

// route for file upload
app.post("/api/uploadfile", upload.single('myFile'), (req, res, next) => {
    console.log(req.file.originalname + " file successfully uploaded !!");
    console.log(req.body)
    res.sendStatus(200);
});
app.get("/api/upload")
app.use('/images', express.static('images'))
///////////////////////////////////////////////////////////

app.use("/auth", authRoute);

app.use('/api/users', require('./routes/userRoutes'));

app.use((err, req, res, next)=>{
    res.status(500).json({err: err.message})
})

app.use(errorHandler);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
