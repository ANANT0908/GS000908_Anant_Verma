import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChartPage from './components/ChartPage';
import NavBar from './components/NavBar';
import PlanningPage from './pages/PlanningPage';
import SideMenu from './components/SideMenu';
import SKUsPage from './pages/SKUsPage';
import StoresPage from './pages/StoresPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="main-layout">
        <SideMenu />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/planning" replace />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/skus" element={<SKUsPage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
