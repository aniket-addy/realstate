import "./Header.css";

function Header() {
  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-button" type="button">
          ☰
        </button>

        <div>
          <h1>Add New Property</h1>
          <p>Add a new property to your real estate listings</p>
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon" type="button">
          🔔
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">
            A
          </div>

          <div className="admin-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>

          <span className="profile-arrow">⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Header;