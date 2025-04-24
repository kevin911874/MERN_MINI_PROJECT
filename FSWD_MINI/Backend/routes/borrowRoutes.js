const express = require("express");
const router = express.Router();
const Borrow = require("../models/borrowModel");
const upload = require("../middleware/upload");

// GET all borrowed items
router.get("/", async (req, res) => {
  try {
    const borrowItems = await Borrow.find();
    res.status(200).json(borrowItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowed items", error });
  }
});

// GET only pending borrowed items
router.get("/pending", async (req, res) => {
  try {
    const pendingItems = await Borrow.find({ status: "pending" });
    res.status(200).json(pendingItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending items", error });
  }
});

// POST a new borrow record with an image
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { itemName, issuedBy, issuedTo, purpose, issueDate } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newBorrow = new Borrow({
      itemName,
      issuedBy,
      issuedTo,
      purpose,
      issueDate,
      imageUrl,
      status: "pending", // Default status when created
    });

    await newBorrow.save();
    res.status(201).json(newBorrow);
  } catch (error) {
    res.status(500).json({ message: "Error creating borrow record", error });
  }
});

// PUT: Update a borrow record (Edit)
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const { itemName, issuedBy, issuedTo, purpose, issueDate } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedData = {
      itemName,
      issuedBy,
      issuedTo,
      purpose,
      issueDate,
    };

    if (imageUrl) updatedData.imageUrl = imageUrl; // Update image only if a new one is uploaded

    const updatedItem = await Borrow.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
});

// PUT: Update status to "submitted"
router.put("/submit/:id", async (req, res) => {
  try {
    const { returnDate, receivedBy } = req.body;
    
    const updatedItem = await Borrow.findByIdAndUpdate(
      req.params.id,
      { status: "submitted", returnDate, receivedBy },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item status", error });
  }
});

// DELETE: Remove a borrow record
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await Borrow.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

module.exports = router;
