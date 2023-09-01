const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// Getting All
router.get("/", async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getProject, (req, res) => {
  res.json(res.project);
});

// Creating One
router.post("/", async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    tech_stack: req.body.tech_stack,
    code_url: req.body.code_url,
    website_url: req.body.website_url,
    photo_url: req.body.photo_url,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getProject, async (req, res) => {
  if (req.body.title != null) {
    res.project.title = req.body.title;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  if (req.body.tech_stack != null) {
    res.project.tech_stack = req.body.tech_stack;
  }
  if (req.body.code_url != null) {
    res.project.code_url = req.body.code_url;
  }
  if (req.body.website_url != null) {
    res.project.website_url = req.body.website_url;
  }
  if (req.body.photo_url != null) {
    res.project.photo_url = req.body.photo_url;
  }
  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getProject, async (req, res) => {
  try {
    await Project.deleteOne({ _id: res.project._id });
    res.json({ message: "Deleted project" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.project = project;
  next();
}

module.exports = router;
