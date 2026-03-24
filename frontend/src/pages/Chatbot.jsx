import React, { useState } from 'react'
import SideBar from '../components/SideBar';

const Chatbot = () => {
  const [activeTab, setActiveTab] = useState("complaint");

  return (
    <div className="flex min-h-screen bg-gray-50">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-2xl flex flex-col items-center">
                <h1>Will be updated Shortly</h1>
            </div>
        </main>
    </div>
  )
}

export default Chatbot
