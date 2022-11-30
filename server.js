/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const animalRouter = require("./controllers/animal.js")

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use("/animals", animalRouter)

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))