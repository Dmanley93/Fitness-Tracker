const router = require("express").Router();
const Workout = require("../models/workout.js")

router.get("/api/workouts", async (req, res) => {
    try {
       const results = await Workout.find({});
       res.json(results)
    } catch (err) {
       res.json(err) 
    }
});

router.post("/api/workouts", async (req, res) => {
    try {
       const results = await Workout.create(req.body);
       res.json(results)
    } catch (err) {
       res.json(err) 
    }
});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        console.log(req.body);
       const results = await Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}, {new: true});
       res.json(results)
    } catch (err) {
       res.json(err) 
    }
});

module.exports = router;