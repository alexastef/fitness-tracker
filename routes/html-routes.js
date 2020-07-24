const path = require("path");
const db = require("../models");

module.exports = function(app) {

    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));    
    });

    // app.get("/exercise?" + "id=" + )

    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
}
