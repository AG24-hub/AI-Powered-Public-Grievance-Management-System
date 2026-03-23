import React, { useContext, useState } from 'react';
import { Users, BarChart3, CheckCircle2, UserPlus, LogOut, Menu, X } from 'lucide-react';
import UserContext from '../context/UserProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = ({ activeTab, setActiveTab, setModalType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarItems = [
    { name: "My Client", icon: Users},
    { name: "Insights", icon: BarChart3},
    { name: "Update Status", icon: CheckCircle2},
    { name: "Add Admin", icon: UserPlus}
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
          {sidebarItems.map((item) => (
            <button 
              key={item.name} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.name ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
              onClick={() => {
                setActiveTab(item.name);
                //Open modal for all except "My Client"
                if (item.name !== "My Client") {
                  setModalType(item.name);
                } else {
                  setModalType(null);
                }

                setIsOpen(false); //close in mobile
              }}
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