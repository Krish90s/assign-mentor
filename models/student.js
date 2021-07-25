const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { mentorSchema } = require("./mentor");

const Student = mongoose.model(
  "Students",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
    },
    mentor: {
      type: mentorSchema,
      required: true,
    },
  })
);

function validateStudent(student) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mentorId: Joi.objectId().required(),
  });
  return schema.validate(student);
}

exports.Student = Student;
exports.validate = validateStudent;
