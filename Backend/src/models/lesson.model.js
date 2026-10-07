const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true, trim: true },
  order: { type: Number, required: true },
  content: { type: String, required: true },
  codeExample: { type: String, default: "" },
  keyPoints: [String],
});

module.exports = mongoose.model("Lesson", lessonSchema);