import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ExpensePage from './pages/ExpensePage';
import IncomePage from './pages/IncomePage';
import SupplierPage from './pages/SupplierPage';
import ClientPage from './pages/ClientPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', padding: 0 }}>
            <li><Link to="/categories">קטגוריות</Link></li>
            <li><Link to="/expenses">הוצאות</Link></li>
            <li><Link to="/incomes">הכנסות</Link></li>
            <li><Link to="/suppliers">ספקים</Link></li>
            <li><Link to="/clients">לקוחות</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="/incomes" element={<IncomePage />} />
          <Route path="/suppliers" element={<SupplierPage />} />
          <Route path="/clients" element={<ClientPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
