import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": "Dashboard",
  "/my-learning": "My Learning",
  "/progress": "Progress",
  "/settings": "Settings",
};

function Topbar({ user }) {
  const { pathname } = useLocation();

  return (
    <header className="topbar">
     <span className="topbar-title">
    {titles[pathname] ||
    (pathname.startsWith("/courses/") ? "Course Details" : "SkillVilla")}
      </span>
      <div className="topbar-user">
        <span>{user.name}</span>
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      </div>
    </header>
  );
}

export default Topbar;