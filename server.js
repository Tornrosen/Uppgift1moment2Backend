//Applikation för att spara och hämta arbetslivserfarenhet

//inkludera och starta upp express och cors samt tilldela port
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//ansluta till databas

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "jobs",
    password: "workExperience",
    database: "jobs"
})

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err);
        return;
    }
    console.log("Connected to MySQL!")
})

//routes till API

app.get("/api", (req, res) => {
    res.json({ message: "This is an API!" });
})

app.get("/api/jobs", (req, res) => {
    connection.query(`SELECT * FROM jobs`, (err, results) => {
        if (err) {
            res.status(500).json({ err: "Error:" + err });
            return;
        }
        console.log(results);
        if (results.length === 0) {
            res.status(200).json({ message: "No data yet." })
        } else {
            res.json(results);
        }
    })
})

app.post("/api/jobs", (req, res) => {
    let title = req.body.title;
    let workplace = req.body.workplace;
    let employer = req.body.employer;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    let errors = {
        message: "",
        details: "",
        https_response: {}

    }

    if (!title || !workplace || !employer || !startdate || !enddate || !description) {
        errors.message = "Failed to include essential data.";
        errors.details = "Please fill in all required data.";
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        return res.status(400).json(errors);

    }

    connection.query("INSERT INTO jobs (title, workplace, employer, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)",
        [title, workplace, employer, startdate, enddate, description], (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Added to database:" + results);
            }

            let job = {
                title: title,
                workplace: workplace,
                employer: employer,
                startdate: startdate,
                enddate: enddate,
                description: description
            }
            res.json({ message: "Job added!", job });
        });

})

app.put("/api/jobs/:id", (req, res) => {
    res.json({ message: "Job updated" + req.params.id });
})

app.delete("/api/jobs/:id", (req, res) => {
    const jobId = req.params.id;
    connection.query("DELETE FROM jobs WHERE id =?", [jobId], (error, results) => {
        if (error) {
            res.status(500).json({ message: "Could not delete, try again later." });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: "Could not find job with id: " + jobId });
        } else {
            res.json({ message: "Job deleted." })
        }
    }
    )
})


//Starta applikationen

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})