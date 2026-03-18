import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/landing'
import UserAuth from './pages/UserAuth';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/authentication" element={<UserAuth/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/*<Route path="/complaint" element={<ComplaintForm />} />*/}
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
