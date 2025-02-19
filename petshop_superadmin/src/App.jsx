import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/common_pages/Homepage';
import ContactUs from './pages/common_pages/ContactUs';
import AboutUs from './pages/common_pages/AboutUs';
import PageNotFound from './pages/common_pages/PageNotFound';
import Login from './pages/user_pages/Login';
import UserDashboard from './pages/user_pages/UserDashboard';
import Register from './pages/user_pages/Register';
import Header from './components/common_components/Header';
import Footer from './components/common_components/Footer';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <Router>
         <Header/>
       <Routes>
     
          <Route path="/" element = {<Homepage /> } />
          <Route path="/home" element = {<Homepage /> } />
          <Route path="/homepage" element = {<Homepage /> } />
          <Route path="/contact-us" element = {<ContactUs /> } />
          <Route path="/about-us" element = {<AboutUs /> } />
          <Route path="/register" element = {<Register /> } />
          <Route path="/login" element = {<Login /> } />
          <Route path="/user-dashboard" element = {<UserDashboard /> } />
          <Route path="/page-not-found" element = {<PageNotFound /> } />
          <Route path="/*" element = {<PageNotFound /> } />
       </Routes>
       <Footer />
    </Router>
    </AuthProvider>
  )
}

export default App