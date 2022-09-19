
import React from 'react';
import  ReactDOM  from 'react-dom/client';
import './styles/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';

const App = () => {
    return (
        <HashRouter>
          <Navbar/>
          <main className="container pt-5">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/customers" element={<CustomersPage/>}/>
              <Route path="/invoices" element={<InvoicesPage/>}/>
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


