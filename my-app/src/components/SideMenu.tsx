import React from 'react';
import { NavLink } from 'react-router-dom';

const SideMenu: React.FC = () => {
  return (
    <div className="side-menu">
      <nav>
        <ul>
          <li>
            <NavLink to="/stores" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>Store</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/skus" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>SKU</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/planning" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>Planning</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/chart" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>Charts</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
