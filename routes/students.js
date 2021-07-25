const { Student, validate } = require("../models/student");
const { Mentor } = require("../models/mentor");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find().sort("name");
  res.send(students);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const mentor = await Mentor.findById(req.body.mentorId);
  if (!mentor) return res.status(400).send("Invalid Mentor");

  let student = new Student({
    name: req.body.name,
    email: req.body.email,
    mentor: {
      _id: mentor._id,
      name: mentor.name,
    },
  });
  student = await student.save();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const mentor = await Mentor.findById(req.body.mentorId);
  if (!mentor) return res.status(400).send("Invalid Mentor");

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      mentor: {
        _id: mentor._id,
        name: mentor.name,
      },
    },
    { new: true }
  );
  if (!student) return res.status(404).send("Student not Found");
  student.name = req.body.name;
  student.email = req.body.email;
  student.mentor = req.body.mentor;
  res.send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send("Student not Found");
  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send("Student not Found");
  res.send(student);
});

module.exports = router;
