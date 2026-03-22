import React, { useContext, useState } from 'react';
import { LayoutDashboard, MessageSquare, PlusCircle, User, LogOut, Menu, X } from 'lucide-react';
import UserContext from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Lodge Grievance', icon: PlusCircle },
    { name: 'Chatbot AI', icon: MessageSquare },
    { name: 'Profile', icon: User }
  ];

  const handleLogOut = ()=> {
    // 1. Clear the specific user data
    localStorage.removeItem("userInfo");
    
    // 2. Clear the React Context state
    setUser(null);
    
    // 3. Redirect to the landing page (usually "/")
    navigate("/");
  }

  return (
    <>
      {/* 1. Mobile Toggle Button (Visible only on small screens) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#2D60FF] text-white rounded-lg shadow-md"
        >
          <Menu size={24} />
        </button>
      )}

      {/* 2. Backdrop Overlay (Closes sidebar when clicking outside on mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. The Sidebar Aside */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50
        w-64 h-screen bg-gradient-to-b from-[#2D60FF] to-[#1E3A8A] text-white p-6 
        flex flex-col shadow-xl transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header with Close Button for Mobile */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">Civic-AI</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                item.active ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)} // Close menu after selecting item on mobile
            >
              <item.icon size={20} /> {item.name}
            </button>
          ))}
        </nav>

        {/* Sign Out Button */}
        <button className="flex items-center gap-3 px-4 py-3 text-red-200 hover:text-white transition mt-auto border-t border-white/10 pt-4" onClick={handleLogOut}>
          <LogOut size={20}/> Sign Out
        </button>
      </aside>
    </>
  );
};

export default SideBar;