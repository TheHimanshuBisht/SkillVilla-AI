function ContinueLearning() {
  const courses = [
    { title: "JavaScript Fundamentals", lesson: "Lesson 12: Closures", progress: 65 },
    { title: "Data Structures", lesson: "Lesson 7: Linked Lists", progress: 40 },
    { title: "Business English", lesson: "Lesson 3: Email Writing", progress: 20 },
  ];

  return (
    <section className="panel">
      <h2 className="section-title">Continue Learning</h2>

      {courses.map((course) => (
        <div className="course-item" key={course.title}>
          <div className="course-info">
            <h3>{course.title}</h3>
            <p>{course.lesson}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
          <button className="feature-btn">Resume</button>
        </div>
      ))}
    </section>
  );
}

export default ContinueLearning;