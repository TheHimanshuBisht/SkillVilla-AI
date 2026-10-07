import { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";

function MyLearning() {
  const [filter, setFilter] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const isDone = course.completed === course.lessons;
    if (filter === "completed") return isDone;
    if (filter === "progress") return !isDone;
    return true;
  });

  const getButtonText = (course) => {
    if (course.completed === course.lessons) return "Review";
    if (course.completed === 0) return "Start";
    return "Resume";
  };

  return (
    <div>
      <h2 className="section-title">My Learning</h2>

      <div className="tabs">
        <button
          className={filter === "all" ? "tab active" : "tab"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "progress" ? "tab active" : "tab"}
          onClick={() => setFilter("progress")}
        >
          In Progress
        </button>
        <button
          className={filter === "completed" ? "tab active" : "tab"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="empty-text">No courses here yet.</p>
      ) : (
        <div className="learning-grid">
          {filteredCourses.map((course) => {
            const percent = Math.round((course.completed / course.lessons) * 100);

            return (
              <div className="learning-card" key={course.id}>
                <div className="learning-top">
                  <div className="feature-icon">{course.icon}</div>
                  <span className="course-tag">{course.category}</span>
                </div>

                <h3>{course.title}</h3>
                <p className="learning-meta">
                  {course.completed} of {course.lessons} lessons
                </p>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="learning-percent">{percent}% complete</p>

                <Link to={`/courses/${course.id}`} className="feature-btn">
                  {getButtonText(course)}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyLearning;