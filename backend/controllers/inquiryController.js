import Inquiry from "../models/Inquiry.js";

// Get all inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new inquiry
export const addInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    const saved = await inquiry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete inquiry by ID
export const deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

