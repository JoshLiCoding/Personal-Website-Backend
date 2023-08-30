const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tech_stack: {
    type: String,
    required: true,
  },
  code_url: {
    type: String,
    required: true,
  },
  website_url: {
    type: String,
  },
  photo_url: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
