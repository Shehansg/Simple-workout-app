const express = require('express');
const router = express.Router();
const { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout } = require( '../controller/workoutCotrollers');


//get all workouts
router.get('/' , getWorkouts);

//get one workout
router.get( '/:id' , getWorkout);

//create a workout
router.post('/', createWorkout);

//update a workout
router.patch('/:id' , updateWorkout);

//delete a workout
router.delete('/:id' , deleteWorkout);



module.exports = router; // Export the router


