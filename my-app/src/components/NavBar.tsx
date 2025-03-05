import React from 'react';

const NavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img
          src="https://via.placeholder.com/120x40?text=GSynergy+Logo"
          alt="GSynergy Logo"
          style={{ marginRight: 8 }}
        />
        <h1>Data Viewer App</h1>
      </div>
      <div className="auth-section">
        <button>Sign In</button>
      </div>
    </header>
  );
};

export default NavBar;
