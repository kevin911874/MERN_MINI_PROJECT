const Borrow = require("../models/Borrow");

exports.createBorrowRecord = async (req, res) => {
  try {
    const { itemName, issuedBy, issuedTo, purpose, issueDate, returnDate, receivedBy } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newBorrow = new Borrow({
      itemName,
      issuedBy,
      issuedTo,
      purpose,
      issueDate,
      returnDate,
      receivedBy,
      imageUrl,
    });

    await newBorrow.save();
    res.status(201).json({ message: "Borrow record created successfully", data: newBorrow });
  } catch (error) {
    res.status(500).json({ message: "Error creating borrow record", error });
  }
};

exports.getBorrowRecords = async (req, res) => {
  try {
    const borrowRecords = await Borrow.find();
    res.json(borrowRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow records", error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Borrow.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Borrow.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
