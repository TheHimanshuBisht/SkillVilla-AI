function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <h2>SkillVilla</h2>
      <nav>
        <div className="nav-item active">Dashboard</div>
        <div className="nav-item">My Learning</div>
        <div className="nav-item">Progress</div>
        <div className="nav-item">Settings</div>
      </nav>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;