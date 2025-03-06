import React from 'react';
import logo from "../assets/GsynergyLogo.svg"
const NavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img
          src={logo}
          alt="GSynergy Logo"
          style={{ marginRight: 8 }}
        />
      </div>
        <h1>Data Viewer App</h1>
      <div className="auth-section">
        <button>Sign In</button>
      </div>
    </header>
  );
};

export default NavBar;
