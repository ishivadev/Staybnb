const User = require("../Models/userModel.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ 
        username,
        email
        })
        let registeredUser = await User.register(newUser, password);
        //console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next();
            } else {
                req.flash("success", "Welcome to Staybnb. The user registered successfully.");
                res.redirect("/listings");
            }
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }    
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Staybnb. You're logged in!")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
    //console.log(req.user); //Logged-in user details
}


module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are successfully logout.")
        res.redirect("/listings");
    })
}