import { createContext, useState } from "react";
import { seeAllGrievances, seeAllStats, seeMyGrievances, updateStatus } from "../Services/grievanceService";

//create context
export const GrievanceContext = createContext()

//provider
export const GrievanceProvider = ({children})=> {
    const [grievances, setGrievances] = useState([])
    const [allGrievances, setAllGrievances] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    
    //get my grievances
    const fetchMyGrievances = async () => {
      try {
        setLoading(true);
        const data = await seeMyGrievances()
        console.log("Full API Response:", data)
        setGrievances(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    //get all grievances
    const fetchAllGrievances = async () => {
      try {
        setLoading(true);
        const data = await seeAllGrievances()
        //console.log(data)
        setAllGrievances(data);
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

    //update status
    const changeStatus = async (id, newStatus) => { 
      try { 
        setLoading(true)
        const updated = await updateStatus(id, newStatus) 
        //instant UI update
        setAllGrievances((prev) =>
          prev.map((g) =>
            g._id === id ? updated : g
        ))
      } catch (error) 
      { 
        setError(error.message); 
      } finally 
      { 
        setLoading(false); 
      } 
    };

  return (
    <GrievanceContext.Provider value={{grievances, fetchMyGrievances, allGrievances, fetchAllGrievances, stats, fetchStats, changeStatus}}>
        {children}
    </GrievanceContext.Provider>
  )
}


