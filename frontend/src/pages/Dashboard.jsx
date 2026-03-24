import React, { useContext, useEffect, useState } from 'react'
//Lucide React is a popular open-source icon library for React applications that provides a collection of beautiful, lightweight, and consistent SVG icons.
import SideBar from "../components/SideBar"
import UserContext from '../context/UserProvider';
import {GrievanceContext} from '../context/GrievanceProvider';

const Dashboard = () => {

  const {user} = useContext(UserContext)
  const {grievances, fetchMyGrievances, stats, fetchStats} = useContext(GrievanceContext)

  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(()=> {
    if (location.pathname === "/dashboard") {
      fetchMyGrievances();
      fetchStats();
    }
  }, [location.pathname] )

  const statsData = [
    { label: "Created", val: stats?.created || 0, color: "from-blue-500 to-blue-600" },
    { label: "Pending", val: stats?.pending || 0, color: "from-emerald-400 to-teal-500" },
    { label: "Processing", val: stats?.processing || 0, color: "from-amber-400 to-orange-500" },
    { label: "Resolved", val: stats?.resolved || 0, color: "from-green-500 to-emerald-600" }
  ];

  return (
      <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans">
        {/* Sidebar needs to be hidden or a hamburger menu on mobile */}
        <SideBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 overflow-y-auto w-full">
          <header className="bg-white border-b px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-10">
            {/* Desktop: Welcome, Name (hidden on mobile) */}
            <h1 className="hidden md:block text-xl font-semibold text-slate-800">
              Welcome, <span className='uppercase'>{user?.name}</span>
            </h1>

            {/* Mobile: Welcome to Civic AI (hidden on desktop, centered) */}
            <h1 className="block md:hidden text-lg font-bold text-slate-800 w-full text-center">
              Welcome to Civic-AI
            </h1>
          </header>

          <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Stats Cards: 1 col on mobile, 2 on small tablets, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {statsData.map((stat) => (
                <div key={stat.label} className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <p className="opacity-80 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-1">{stat.val}</h3>
                </div>
              ))}
            </div>

            {/* Table Section: Added overflow-x-auto for mobile scrolling */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Recent Grievances</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grievances.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-6 text-gray-400">
                            No grievances found
                          </td>
                        </tr>
                      )}
                      {grievances?.map((g) => (
                        <tr key={g._id} className="hover:bg-slate-50 transition">
                          {/*ID */}
                          <td className="px-6 py-4 font-mono text-sm text-blue-600">{g._id}</td>
                          {/*Description*/}
                          <td className="px-6 py-4 text-slate-600 text-sm italic">{g.complaintDetails}</td>
                          {/*status*/}
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600">{g.status?.toUpperCase()}</span>
                          </td>
                          {/*Date*/}
                          <td className="px-6 py-4 text-slate-400 text-sm">{new Date(g.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default Dashboard;