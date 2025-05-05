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

connection.query("DROP TABLE IF EXISTS jobs;", (err, results) => {
    if (err) throw err;
    console.log("Table deleted!")
})

connection.query(`CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    workplace VARCHAR(100),
    employer VARCHAR(100),
    startdate VARCHAR(100),
    enddate VARCHAR(100),
    description VARCHAR(500),
    created DATETIME DEFAULT CURRENT_TIMESTAMP)`, (err, results) => {
    if (err) throw err;
    console.log("Table created!")
}
)

