export const courses = [
  { id: 1, title: "JavaScript Fundamentals", category: "Programming", lessons: 30, completed: 20, icon: "💻" },
  { id: 2, title: "Data Structures", category: "Programming", lessons: 25, completed: 10, icon: "🧩" },
  { id: 3, title: "Business English", category: "English", lessons: 15, completed: 3, icon: "🗣️" },
  { id: 4, title: "Aptitude Basics", category: "Aptitude", lessons: 12, completed: 12, icon: "🧮" },
  { id: 5, title: "HTML & CSS", category: "Web", lessons: 18, completed: 0, icon: "🎨" },
];

export const getLessons = (course) =>
  Array.from({ length: course.lessons }, (_, i) => ({
    number: i + 1,
    title: `Lesson ${i + 1}`,
    done: i < course.completed,
  }));