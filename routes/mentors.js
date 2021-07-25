const { Mentor, validate } = require("../models/mentor");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const mentors = await Mentor.find().sort("name");
  res.send(mentors);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let mentor = new Mentor({
    name: req.body.name,
  });
  mentor = await mentor.save();
  res.send(mentor);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const mentor = await Mentor.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!mentor) return res.status(404).send("Mentor not Found");
  mentor.name = req.body.name;
  res.send(mentor);
});

router.delete("/:id", async (req, res) => {
  const mentor = await Mentor.findByIdAndRemove(req.params.id);
  if (!mentor) return res.status(404).send("Mentor not Found");
  res.send(mentor);
});

router.get("/:id", async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) return res.status(404).send("Mentor not Found");
  res.send(mentor);
});

module.exports = router;
