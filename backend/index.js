const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log("SEVER STARTED 🚀");
});


app.get("/", (req, res) => {
  //   res.send("Welcome to all my pets information");
  // TODO: Add
  res.status(200);
});

app.get("/:petId", (req, res) => {
  const petId = parseInt(req.params.petId);
  const pet = pets.find((item) => item.id === petId);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404).send("Pet not found");
  }
});

app.post("/newPet", (req, res) => {
  const { name, type, age } = req.body;

  const newPet = {
    id: pets.length + 1,
    name,
    type,
    age,
  };

  pets.push(newPet);

  res.status(201).json(newPet);
});

app.put("/updatePet/:petId", (req, res) => {
  const petId = parseInt(req.params.petId);
  const petIndex = pets.findIndex((pet) => pet.id === petId);

  const updatedPetInfo = req.body;

  if (petIndex !== -1) {
    pets[petIndex] = { ...pets[petIndex], ...updatedPetInfo };
    res.json(pets[petIndex]);
  } else {
    res.status(404).send("Pet to update not found");
  }
});
