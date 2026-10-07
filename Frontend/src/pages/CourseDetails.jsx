import { useParams, Link } from "react-router-dom";
import { courses, getLessons } from "../data/courses";

function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="panel">
        <h2 className="section-title">Course not found</h2>
        <Link to="/my-learning">Back to My Learning</Link>
      </div>
    );
  }

  const lessons = getLessons(course);
  const percent = Math.round((course.completed / course.lessons) * 100);

  return (
    <div>
      <Link to="/my-learning" className="back-link">
        ← Back to My Learning
      </Link>

      <div className="course-header">
        <div className="feature-icon">{course.icon}</div>
        <div>
          <h2>{course.title}</h2>
          <p className="learning-meta">
            {course.category} · {course.completed} of {course.lessons} lessons
          </p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="learning-percent">{percent}% complete</p>

      <div className="panel">
        <h3 className="section-title">Lessons</h3>

        {lessons.map((lesson) => (
          <div className="lesson-item" key={lesson.number}>
            <span className={lesson.done ? "lesson-check done" : "lesson-check"}>
              {lesson.done ? "✓" : lesson.number}
            </span>
            <span className="lesson-title">{lesson.title}</span>
            <span className="lesson-status">
              {lesson.done ? "Completed" : "Not started"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;