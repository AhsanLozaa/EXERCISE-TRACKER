// The express router 
const router = require('express').Router();
// Requiring the model that we created
let Exercise = require('../models/exercise.model');

// This is the first route
/**
 * This is the first inpoint which handles the http GET requests on the '/users'
 * url path
 * 
 */
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * ":id" is a variable, i.e the mongo db id created automatically
 * finding the exercises by its id
 */
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json('Error: ' + err));
});



// This is a post request
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('Exercise Deleted'))
            .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);    

    exercise.save()
            .then(() => res.json('Exercise Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;