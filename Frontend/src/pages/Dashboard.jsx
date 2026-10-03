import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCards from "../components/dashboard/StatsCards";
import AIFeatures from "../components/dashboard/AIFeatures";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import RecentActivity from "../components/dashboard/RecentActivity";

import "../styles/dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={handleLogout} />

      <main className="dashboard-main">
        <Topbar user={user} />

        <div className="dashboard-content">
          <WelcomeCard user={user} />
          <StatsCards />
          <AIFeatures />

          <div className="dashboard-grid">
            <ContinueLearning />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;