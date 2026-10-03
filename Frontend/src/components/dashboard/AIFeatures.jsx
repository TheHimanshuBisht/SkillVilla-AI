function AIFeatures() {
  const features = [
    {
      title: "AI English Tutor",
      desc: "Practice speaking and writing with instant feedback.",
      icon: "🗣️",
    },
    {
      title: "Ask AI",
      desc: "Get quick answers to your doubts, any time.",
      icon: "🤖",
    },
    {
      title: "DSA Practice",
      desc: "Solve problems and sharpen your coding skills.",
      icon: "💻",
    },
    {
      title: "Aptitude Practice",
      desc: "Practice quantitative, logical and verbal questions.",
      icon: "🧮",
    },
    {
      title: "Mock Tests",
      desc: "Test your preparation with timed practice tests.",
      icon: "📝",
    },
  ];

  return (
    <section className="section">
<h2 className="section-title">Practice & AI Tools</h2>
      <div className="feature-grid">
        {features.map((item) => (
          <div className="feature-card" key={item.title}>
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <button className="feature-btn">Open</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIFeatures;