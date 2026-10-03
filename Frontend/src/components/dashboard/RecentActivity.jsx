function RecentActivity() {
  const activities = [
    { text: "Completed Lesson 11: Scope", time: "2 hours ago", icon: "✅" },
    { text: "Scored 8/10 in Aptitude Quiz", time: "Yesterday", icon: "🧮" },
    { text: "Solved 3 DSA problems", time: "2 days ago", icon: "💻" },
    { text: "Practised with AI English Tutor", time: "3 days ago", icon: "🗣️" },
  ];

  return (
    <section className="panel">
      <h2 className="section-title">Recent Activity</h2>

      {activities.map((item) => (
        <div className="activity-item" key={item.text}>
          <div className="activity-icon">{item.icon}</div>
          <div>
            <p className="activity-text">{item.text}</p>
            <span className="activity-time">{item.time}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default RecentActivity;