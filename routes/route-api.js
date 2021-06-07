const router = require("express").Router();
const { db } = require("../models/workout.js");
const Workout = require("../models/workout.js")

router.get("/api/workouts", async (req, res) => {
    try {
       const results = await Workout.aggregate([
          {
             $addFields: {
                totalDuration: {
                   $sum: '$exercises.duration'
                }
             }
          }
         ]);
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

router.delete('/api/workouts/:id', async (req, res) => {
   try {
      const results = await Workout.findByIdAndDelete(req.params.id)
      res.json(results)
   } catch (err) {
      res.json(err)
   }
})

router.put("/api/workouts/:id", async (req, res) => {
    try {
       console.log(req.body);
       const results = await Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}, {new: true});
       res.json(results)
    } catch (err) {
       res.json(err) 
    }
});

router.get("/api/workouts/range", async (req, res) => {
   try {
      const results = await Workout.aggregate([
         {
            $addFields: {
               totalDuration: {
                  $sum: '$exercises.duration'
               }
            }
         },
         {$limit: 7},
         {$sort: { _id: -1 } },
      ]);
      res.json(results)
   } catch (err) {
      res.json(err) 
   }
});

module.exports = router;