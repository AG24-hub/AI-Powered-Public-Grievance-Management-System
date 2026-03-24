import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/landing'
import UserAuth from './pages/UserAuth';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from "./routes/protectedRoute";
import { Toaster } from 'react-hot-toast';
import LodgeGrivances from './pages/LodgeGrivances';
import Chatbot from './pages/Chatbot';
import ManageComplaint from './pages/ManageComplaint';

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/authentication" element={<UserAuth/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/complaint" element={<ProtectedRoute><LodgeGrivances /></ProtectedRoute>} />
          <Route path="/dashboard/chatbotAI" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="/dashboard/manage" element={<ProtectedRoute><ManageComplaint /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
