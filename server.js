require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const projectsRouter = require("./routes/projects");
app.use("/projects", projectsRouter);

app.listen(port, () => console.log(`Express app running on port ${port}!`));

//app.get("/", (req, res) => res.send("Hello World!"));
