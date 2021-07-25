const mongoose = require("mongoose");
const Joi = require("joi");

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Mentor = new mongoose.model("Mentor", mentorSchema);

function validateMentor(mentor) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(mentor);
}

exports.mentorSchema = mentorSchema;
exports.Mentor = Mentor;
exports.validate = validateMentor;
