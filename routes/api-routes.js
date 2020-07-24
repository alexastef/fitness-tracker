const api = require("../public/api.js");
const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).sort( {_id: -1} ).limit(1)
        .then(lastWorkout => {
            res.send(lastWorkout);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    });

    // when user clicks add workout, new workout is created
    app.post("/api/workouts", ({body}, res) => {
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
                res.send(err);
            });
    });

    // when user adds an exercise to a workout, then that workout is updated in the database with the new exercise
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.update(
            { _id: mongojs.ObjectId(req.params.id) },
            { $push: { exercises: req.body} })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(allWorkouts => {
                res.json(allWorkouts);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    })
}

