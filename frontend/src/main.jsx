import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserProvider.jsx'
import { GrievanceProvider } from './context/GrievanceProvider.jsx'
import { ChatbotProvider } from './context/chatbotProvider.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <GrievanceProvider>
      <ChatbotProvider>
        <App />
      </ChatbotProvider>
    </GrievanceProvider>
  </UserProvider>
)
