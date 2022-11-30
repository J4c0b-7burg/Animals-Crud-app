////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Animal = require("../models/animal");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.get("/seed", (req, res) => {
  const startAnimals = [
    { name: "Dog", color: "black", isCute: true },
    { name: "Cat", color: "orange", isCute: true },
    { name: "Goat", color: "white", isCute: false },
    { name: "Duck", color: "red", isCute: true },
    { name: "Hippo", color: "brown", isCute: false },
  ];

  Animal.remove({}, (err, data) => {
    Animal.create(startAnimals, (err, data) => {
      res.json(data);
    });
  });
});

// index route
router.get("/", (req, res) => {
  Animal.find({}, (err, animals) => {
    res.render("index.ejs", { animals });
  });
});

//new route
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// create route
router.post("/", (req, res) => {
  req.body.isCute = req.body.isCute === "on" ? true : false;
  Animal.create(req.body, (err, animal) => {
    res.redirect("/animals");
  });
});

// edit route
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Animal.findById(id, (err, animal) => {
    res.render("edit.ejs", { animal });
  });
});

//update route
router.put("/:id", (req, res) => {
  const id = req.params.id;
  req.body.isCute = req.body.isCute === "on" ? true : false;
  Animal.findByIdAndUpdate(id, req.body, { new: true }, (err, animal) => {
    res.redirect("/animals");
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Animal.findByIdAndRemove(id, (err, animal) => {
    res.redirect("/animals");
  });
});

// show route
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Animal.findById(id, (err, animal) => {
    // render the template with the data from the database
    res.render("show.ejs", { animal });
  });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;