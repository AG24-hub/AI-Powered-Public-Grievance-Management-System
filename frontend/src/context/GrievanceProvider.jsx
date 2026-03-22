import { createContext, useState } from "react";
import { seeAllStats, seeMyGrievances } from "../Services/grievanceService";

//create context
const GrievaceContext = createContext()

//provider
export const GrievanceProvider = ({children})=> {
    const [grievances, setGrievances] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    
    //get my grievances
    const fetchMyGrievances = async () => {
      try {
        setLoading(true);
        const data = await seeMyGrievances()
        setGrievances(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    //get stats 
    const fetchStats = async () => { 
      try { 
        setLoading(true); 
        const data = await seeAllStats() 
        setStats(data); 
      } catch (error) 
      { 
        setError(error.message); 
      } finally 
      { 
        setLoading(false); 
      } 
    };

  return (
    <GrievaceContext.Provider value={{grievances, fetchMyGrievances, stats, fetchStats}}>
        {children}
    </GrievaceContext.Provider>
  )
}


export default GrievaceContext;