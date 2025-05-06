if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash  = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/userModel.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

let app = express();
let port = 3000;
app.use(express.urlencoded({extended: true}))
app.use(express.json()); 

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

//Database connect
// const Mongo_URL = "mongodb://127.0.0.1:27017/Staybnb"
const dbUrl = process.env.ATLASDB_URL;

main()
    .then((res) => {
        console.log("DB connected successfully.");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

//Session store for Mongo
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error", (err) => {
    console.log("ERROR IN MONGO STORE", err);
    
})

//Express session
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};



//Root route
// app.get("/", (req, res) => {
//     res.send("Hi, I'm root");
// });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success")[0];
    res.locals.error = req.flash("error")[0];
    res.locals.currUser = req.user;
    //console.log(res.locals.currUser);
    //console.log(req.user);
    
    next();
})

//Register Demo user
app.get("/demoregister", async (req, res) => {
    let fakeuser = new User({
        email: "student@gmail.com",
        username: "test-user"
    })

    let registerUser = await User.register(fakeuser, "hello@123"); //'Register' will save the user details into db. 'hello@123' is the password here. You can also send the callbakc after password.
    res.send(registerUser);
})


//Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// app.get("/testListing", (req, res) => {
//     let sample = new Listing({
//         title: "Entry 1",
//         description: "Test",
//         image:"",
//         price: 299,
//         location: "WB", 
//         country: "India"
//     })

//     sample.save()
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log(err);
//         })

//     res.send("Working.");
// })

// app.all("/{*any}", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });


//Middleware
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//Error middleware handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong." } = err;
    res.render("error.ejs", { message: message, status: statusCode });  
    //res.status(statusCode).render("error.ejs", {message: message, status: statusCode });
    //res.status(statusCode).send(message);
});

app.listen(port, (req, res) => {
    console.log(`The app is listing on port : ${port}`);
})
