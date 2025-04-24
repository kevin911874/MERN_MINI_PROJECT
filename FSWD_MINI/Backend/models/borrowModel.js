const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  issuedBy: { type: String, required: true },
  issuedTo: { type: String, required: true },
  purpose: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date,  },
  receivedBy: { type: String, },
  imageUrl: { type: String }, // Store image path
  status: { type: String, enum: ["pending", "submitted"], default: "pending" },
});

module.exports = mongoose.model("Borrow", BorrowSchema);
