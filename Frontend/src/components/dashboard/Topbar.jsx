function Topbar({ user }) {
  return (
    <header className="topbar">
      <span className="topbar-title">Dashboard</span>
      <div className="topbar-user">
        <span>{user.name}</span>
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      </div>
    </header>
  );
}

export default Topbar;