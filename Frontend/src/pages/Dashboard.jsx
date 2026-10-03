import { useOutletContext } from "react-router-dom";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCards from "../components/dashboard/StatsCards";
import AIFeatures from "../components/dashboard/AIFeatures";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  const { user } = useOutletContext();

  return (
    <>
      <WelcomeCard user={user} />
      <StatsCards />
      <AIFeatures />

      <div className="dashboard-grid">
        <ContinueLearning />
        <RecentActivity />
      </div>
    </>
  );
}

export default Dashboard;