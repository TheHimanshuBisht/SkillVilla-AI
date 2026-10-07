const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "📘" },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model("Course", courseSchema);