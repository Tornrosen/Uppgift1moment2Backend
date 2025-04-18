//Applikation för att spara och hämta arbetslivserfarenhet

//inkludera och starta upp express och cors samt tilldela port
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//routes till API

app.get("/api", (req, res) => {
    res.json({message: "Welcome to my API!"});
})

app.get("/api/jobs", (req, res) => {
    res.json({message: "Get jobs!"});
})

app.post("/api/jobs", (req, res) => {
    let title = req.body.title;
    let workplace = req.body.workplace;
    let employer = req.body.employer;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    let errors = {
        message:"",
        detail:"",
        https_response:{}

    }

    if(!title||!workplace||!employer||!startdate||!enddate||!description) {
        errors.message= "Failed to include essential data.";
        errors.detail="Please fill in all required data.";
        errors.https_response.message="Bad request";
        errors.https_response.code=400;

        res.status(400).json(errors);
        
        return;
    }

    let job = {
        title: title,
        workplace: workplace,
        employer: employer,
        startdate: startdate,
        enddate: enddate,
        description: description
    }
    res.json({message: "Job added!", job});
    
})

app.put("/api/jobs/:id", (req, res) => {
    res.json({message: "Job updated" + req.params.id});
})

app.delete("/api/jobs/:id", (req, res) => {
    res.json({message: "Job deleted" + req.params.id});
})

//Starta applikationen

app.listen(port, () => {
    console.log("Server is running on port: " +port);
})