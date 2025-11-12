const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/auth");

// Ajouter une tâche
router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user._id });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lister les tâches
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name email");
  res.json(tasks);
});

// Mettre à jour tâche
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Supprimer tâche
router.delete("/:id", protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Tâche supprimée" });
});

module.exports = router;
