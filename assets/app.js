
import React, { useState } from 'react';
import  ReactDOM  from 'react-dom/client';
import './styles/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Routes, Route,Navigate } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from './pages/InvoicePage';
import RegisterPage from './pages/RegisterPage';



AuthAPI.setup();


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  console.log(isAuthenticated);
    return (
        <HashRouter>
          <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
          <main className="container pt-5">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/customers" element={isAuthenticated && <CustomersPage/> || <Navigate to="/" replace />}/>
              <Route path="/customers/:id" element={isAuthenticated && <CustomerPage/> || <Navigate to="/" replace />}/>
              <Route path="/invoices" element={isAuthenticated && <InvoicesPage/> || <Navigate to="/" replace /> }/>
              <Route path="/invoices/:id" element={isAuthenticated && <InvoicePage/> || <Navigate to="/" replace />}/>
              <Route path="/login" element={!isAuthenticated && <LoginPage onLogin={setIsAuthenticated}/>|| <Navigate to="/" replace />}/>
              <Route path="/register" element={!isAuthenticated && <RegisterPage onLogin={setIsAuthenticated}/>|| <Navigate to="/" replace />}/>
            </Routes>
            
          </main>
          
        </HashRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


