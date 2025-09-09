import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import PromotionsManagement from './pages/PromotionsManagement';
import RewardsManagement from './pages/RewardsManagement';
import Settings from './pages/Settings';
export function App() {
  return <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/promotions" element={<PromotionsManagement />} />
          <Route path="/rewards" element={<RewardsManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>;
}