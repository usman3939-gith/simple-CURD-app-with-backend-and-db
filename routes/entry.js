const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Routes
router.get("/entries", entryController.getEntries);
router.post("/entries", entryController.createEntry);
router.put("/entries/:id", entryController.updateEntry);
router.delete("/entries/:id", entryController.deleteEntry);
router.delete("/entries", entryController.deleteAllEntries);

module.exports = router;
