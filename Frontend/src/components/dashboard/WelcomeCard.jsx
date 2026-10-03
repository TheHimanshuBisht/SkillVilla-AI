function WelcomeCard({ user }) {
  return (
    <div className="welcome-card">
      <h1>Welcome back, {user.name}</h1>
      <p>Ready to continue learning today?</p>
    </div>
  );
}

export default WelcomeCard;