const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

//get a single workout

const getWorkout = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) 
            return res.status(404).json({ message: 'Invalid workout id' });

        const workout = await Workout.findById(req.params.id);
        if (!workout) 
            return res.status(404).json({ message: 'Workout not found' });
        res.status(200).json(workout);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }        
};

// create a new workout

const createWorkout = async (req, res) => {
    const { title ,load ,reps} = req.body;

    let emptyFields = []

    if (!title) {
       emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
     }
     if (!reps) {
        emptyFields.push('reps');
     }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    

    try {
        const newWorkout = new Workout({ title, load, reps });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update a workout
const updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) 
      return res.status(404).json({ message: 'Workout not found' });

    res.status(200).json(deletedWorkout);  // ✅ send deleted workout
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
};