function StatsCards() {
  const stats = [
    { label: "Courses Enrolled", value: 4, icon: "📚" },
    { label: "Lessons Completed", value: 28, icon: "✅" },
    { label: "Day Streak", value: 7, icon: "🔥" },
    { label: "Overall Progress", value: "62%", icon: "📈" },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <div className="stat-card" key={item.label}>
          <div className="stat-icon">{item.icon}</div>
          <div>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;