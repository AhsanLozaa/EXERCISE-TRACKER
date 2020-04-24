// The express router 
const router = require('express').Router();
// Requiring the model that we created
let User = require('../models/user.model');

// This is the first route
/**
 * This is the first inpoint which handles the http GET requests on the '/users'
 * url path
 * 
 */
router.route('/').get((req, res) => { // This is a get request
    User.find() // A mongoose method. 
        .then(users => res.json(users)) // getting all the users as a json file
        .catch(err => res.status(400).json('Error: ' + err)); // get the error if its an error
});


// This is a post request
router.route('/add').post((req, res) => { // This will handle the post request
    const username = req.body.username;

    const newUser = new User({username}); // Creating a new instance of user using the username

    // saving the user to the database
    newUser.save()
        .then(() => res.json('User added!')) // if adding new user adding is successful
        .catch(err => res.status(400).json('Error: ' + err));
});

//
module.exports = router;