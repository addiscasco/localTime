// ROUTES FOR USERS

// Require necessary dependencies
const express = require('express');
const routes = express.Router();
const passport = require('passport');
// Require tables from DB testBase
const db = require('../models');
// Require helper functions
let auth_help = require('./helpers/auth_help');
// Require controllers
let userC = require('../controllers/user_c');
let plannerC = require('../controllers/planner_c');

// Signup routes
routes.post('/signup',passport.authenticate('local-signup', 
        {
            failureRedirect: '/'
        }
    ),
    (req,res) => {
        userC.userInfo(req,res);
    }
);


routes.post('/login', passport.authenticate ('local-login', 
        {
            failureRedirect: '/'
        }
    ),
    (req,res) => {
        userC.userInfo(req,res);
    }
);

// Google Login Routes
routes.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
)
);

routes.get('/auth/google/callback', passport.authenticate('google',
 { failureRedirect: '/' }),
(req, res) => {
    // Successful authentication, redirect to dashboard.
    userC.userInfo(req,res);
}
);

// Dash route
routes.get('/dash',
(req,res) => {
    userC.userInfo(req,res);
}
);

routes.post('/test',auth_help.loggedIn,
    (req, res) => {
        userC.plannerUpdate(req,res);
    }
);

// Logout routes
routes.get('/logout', 
    (req,res) => {
        req.session.destroy((err)=>{if(err)throw(err)}).then(
            res.redirect('/')
        )  
    }
);

routes.post('/dash/:id',(req, res) => {
    var test = req.body.location
        userC.plannerUpdate(req,res);
    }
);

// Home route
routes.get('/',  
    (req,res) => {
        res.render('pages/home')
    }
);

// Export routes to server.js
module.exports = routes;









