require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");

const courses = [
  { title: "HTML", slug: "html", category: "Web", description: "Build the structure of web pages.", icon: "🌐", order: 1 },
  { title: "CSS", slug: "css", category: "Web", description: "Style and lay out your pages.", icon: "🎨", order: 2 },
  { title: "JavaScript", slug: "javascript", category: "Programming", description: "Add logic and interactivity.", icon: "💻", order: 3 },
  { title: "English Communication", slug: "english", category: "English", description: "Essential grammar for clear communication.", icon: "🗣️", order: 4 },
];

const lessons = {
  html: [
    {
      title: "What is HTML?",
      content: "HTML (HyperText Markup Language) is used to build the structure of a web page. It uses tags to tell the browser what each part is, such as a heading, a paragraph, an image or a link.",
      codeExample: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>",
      keyPoints: ["HTML describes structure, not style", "Tags usually come in pairs: opening and closing", "Everything visible goes inside <body>"],
    },
    {
      title: "Headings and Paragraphs",
      content: "Headings go from h1 (most important) to h6 (least important). Use one h1 per page. Paragraphs are written with the p tag.",
      codeExample: "<h1>Main title</h1>\n<h2>Section title</h2>\n<p>This is a paragraph.</p>",
      keyPoints: ["h1 to h6 define heading levels", "Use p for normal text", "Headings help both readers and search engines"],
    },
  ],
  css: [
    {
      title: "What is CSS?",
      content: "CSS (Cascading Style Sheets) controls how HTML elements look: colors, fonts, spacing and layout.",
      codeExample: "p {\n  color: blue;\n  font-size: 18px;\n}",
      keyPoints: ["CSS styles the HTML", "A rule has a selector and declarations", "Each declaration is property: value;"],
    },
    {
      title: "CSS Selectors",
      content: "A selector chooses which elements a rule applies to. You can select by tag name, by class (starting with a dot) or by id (starting with a hash).",
      codeExample: "h1 { color: red; }\n.card { padding: 16px; }\n#header { background: black; }",
      keyPoints: ["Tag selector: p", "Class selector: .name", "Id selector: #name (use once per page)"],
    },
  ],
  javascript: [
    {
      title: "Variables: let and const",
      content: "Variables store values. Use let for values that will change and const for values that will not. Avoid var in modern code.",
      codeExample: "let score = 10;\nscore = 15;\n\nconst name = \"Asha\";\n// name = \"Ravi\"; // Error: const cannot be reassigned",
      keyPoints: ["let can be reassigned", "const cannot be reassigned", "Prefer const by default"],
    },
    {
      title: "Functions",
      content: "A function is a reusable block of code. You give it inputs (parameters) and it can return a result.",
      codeExample: "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3)); // 5",
      keyPoints: ["Functions avoid repeating code", "Parameters are inputs", "return sends a value back"],
    },
  ],
  english: [
    {
      title: "Parts of Speech",
      content: "Every word in a sentence has a job. The main parts of speech are: noun (a person, place or thing), verb (an action), adjective (describes a noun), adverb (describes a verb) and preposition (shows relation, like in, on, at).\n\nExample: The quick dog runs in the park.\nquick = adjective, dog = noun, runs = verb, in = preposition, park = noun.",
      codeExample: "",
      keyPoints: ["Noun: names a person, place or thing", "Verb: shows an action or state", "Adjective: describes a noun"],
    },
    {
      title: "Simple Present Tense",
      content: "We use the simple present for habits and facts. With he, she and it, add -s or -es to the verb.\n\nCorrect: She works every day.\nWrong: She work every day.\n\nCorrect: I work every day.",
      codeExample: "",
      keyPoints: ["Use it for habits and facts", "He, she, it + verb with -s", "I, you, we, they + base verb"],
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Lesson.deleteMany();
    await Course.deleteMany();

    const createdCourses = await Course.insertMany(courses);

    const lessonDocs = [];
    createdCourses.forEach((course) => {
      lessons[course.slug].forEach((lesson, index) => {
        lessonDocs.push({ ...lesson, course: course._id, order: index + 1 });
      });
    });

    await Lesson.insertMany(lessonDocs);

    console.log(`Seeded ${createdCourses.length} courses and ${lessonDocs.length} lessons`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();