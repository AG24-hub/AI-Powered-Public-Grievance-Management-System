import { createContext, useEffect, useState } from "react";

//create context
const UserContext = createContext();

//provider
export const UserProvider = ({children})=> {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

  // persist login
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo);
    setLoading(false)
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;