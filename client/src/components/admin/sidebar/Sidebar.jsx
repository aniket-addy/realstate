import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      icon: "▦",
      label: "Dashboard",
    },
    {
      icon: "⌂",
      label: "Properties",
      active: true,
      expandable: true,
    },
    {
      icon: "▥",
      label: "Projects",
    },
    {
      icon: "♙",
      label: "Leads",
    },
    {
      icon: "▣",
      label: "Bookings",
    },
    {
      icon: "♙",
      label: "Users",
    },
    {
      icon: "◯",
      label: "Enquiries",
    },
    {
      icon: "▤",
      label: "Pages",
    },
    {
      icon: "⚙",
      label: "Settings",
    },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span>⌂</span>
          </div>

          <div className="brand-text">
            <strong>DREAM HOME</strong>
            <small>REAL ESTATE</small>
          </div>

          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item, index) => (
            <div key={index}>
              <div
                className={`nav-item ${
                  item.active ? "active" : ""
                }`}
                onClick={() => onNavigate?.(item.label)}
              >
                <span className="nav-icon">
                  {item.icon}
                </span>

                <span className="nav-label">
                  {item.label}
                </span>

                {item.expandable && (
                  <span className="nav-arrow">
                    ˄
                  </span>
                )}
              </div>

              {item.label === "Properties" && (
                <div className="submenu">
                  <div className="submenu-item">
                    All Properties
                  </div>

                  <div className="submenu-item selected">
                    Add New Property
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="nav-item logout-item">
            <span className="nav-icon">
              ↪
            </span>

            <span className="nav-label">
              Logout
            </span>
          </div>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
}

export default Sidebar;