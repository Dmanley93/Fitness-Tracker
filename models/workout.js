const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [{
        name: String,
        type: String,
        weight: Number,
        sets: Number,
        reps: Number,
        duration: Number,
        distance: Number,
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;