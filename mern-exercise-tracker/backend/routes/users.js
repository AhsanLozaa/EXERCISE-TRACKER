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
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


// This is a post request
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;