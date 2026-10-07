const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// All courses, with the number of lessons in each
router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().sort({ order: 1 }).lean();

    const coursesWithCount = await Promise.all(
      courses.map(async (course) => ({
        ...course,
        lessonCount: await Lesson.countDocuments({ course: course._id }),
      }))
    );

    res.status(200).json({ courses: coursesWithCount });
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// One course with its lesson list (titles only)
router.get("/courses/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = await Course.findById(req.params.id).lean();

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const lessons = await Lesson.find({ course: course._id })
      .select("title order")
      .sort({ order: 1 });

    res.status(200).json({ course, lessons });
  } catch (error) {
    console.error("Get course error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// One full lesson
router.get("/lessons/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const lesson = await Lesson.findById(req.params.id).populate("course", "title slug");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ lesson });
  } catch (error) {
    console.error("Get lesson error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;