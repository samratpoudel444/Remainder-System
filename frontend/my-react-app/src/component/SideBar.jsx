import React from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css"; 

function SideBar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Remainder App</h2>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">Dashboard</Link>
        <Link to="/add-remainder" className="sidebar-link">Add Remainder</Link>
        <Link to="/profile" className="sidebar-link">Profile</Link>
        <Link to="/showRemainder" className="sidebar-link">Show Remainder</Link>
        <Link to="/logout" className="sidebar-link">Logout</Link>
      </nav>
    </div>
  );
}

export default SideBar;
