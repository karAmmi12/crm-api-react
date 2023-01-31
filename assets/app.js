
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ViewPdf from './pages/ViewPdf';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import DtInvoicePage from './pages/DtInvoicePage';
import Footer from './components/Footer';



AuthAPI.setup();


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  console.log(isAuthenticated);
    return (
        <HashRouter>
          <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
          <main className="container pt-5">
            <Routes>
              <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>}/>
              <Route path="/customers" element={isAuthenticated && <CustomersPage/> || <Navigate to="/" replace />}/>
              <Route path="/customers/:id" element={isAuthenticated && <CustomerPage/> || <Navigate to="/" replace />}/>
              <Route path="/invoices" element={isAuthenticated && <InvoicesPage/> || <Navigate to="/" replace /> }/>
              <Route path="/pdf/:id" element={isAuthenticated && <ViewPdf/> || <Navigate to="/" replace /> }/>
              <Route path="/profile" element={isAuthenticated && <ProfilePage/> || <Navigate to="/" replace />}/>
              <Route path="/profile/edit" element={isAuthenticated && <EditProfilePage/> || <Navigate to="/" replace />}/>
              <Route path="/invoices/:id" element={isAuthenticated && <InvoicePage/> || <Navigate to="/" replace />}/>
              <Route path="/invoicedt/:id" element={isAuthenticated && <DtInvoicePage/> || <Navigate to="/" replace />}/>
              <Route path="/login" element={!isAuthenticated && <LoginPage onLogin={setIsAuthenticated}/>|| <Navigate to="/" replace />}/>
              <Route path="/register" element={!isAuthenticated && <RegisterPage onLogin={setIsAuthenticated}/>|| <Navigate to="/" replace />}/>
            </Routes>
            
          </main>
          <Footer/>
        <ToastContainer position ={toast.POSITION.BOTTOM_LEFT} theme="colored"/>  
        </HashRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


