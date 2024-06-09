import express from "express";


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send({'name':'Maria'}));

app.listen(port, () => console.log("Server ready on port 5000."));

module.exports = app;