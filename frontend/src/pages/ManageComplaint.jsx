import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import toast from 'react-hot-toast';
import { deleteG } from '../Services/grievanceService';
import { useNavigate } from 'react-router-dom';
import { GrievanceContext } from '../context/GrievanceProvider';

const ManageComplaint = () => {

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("manage");
  const {grievances, fetchMyGrievances} = useContext(GrievanceContext)

  const [id, setID] = useState("")
  const navigate = useNavigate()

  useEffect(()=> {
    fetchMyGrievances()
  }, [])

  const deleteGrievance = async(id)=>{
    try {
      const confirmDel = window.confirm("Are you sure??")
      if(!confirmDel) return
      await deleteG(id)
      toast.success("Grievance deleted successfully!!")
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const updateGrievance = async(id)=> {
    try {
      setLoading(true)
      const g = grievances.find(gr => gr._id === id)
      if(!g) return 
      navigate('/dashboard/complaint', { state: { grievance: g } });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-2xl flex flex-col items-center">
                <h2 className="text-xl font-bold mb-6">Manage Grievance</h2>
                <input type="text" placeholder="Grievance ID" value={id} onChange={(e) => setID(e.target.value)} className="w-full border-2 border-gray-200 rounded-md p-3 mb-6 focus:outline-none focus:border-blue-500" />
                <div className="flex gap-4 w-full">
                    <button onClick={() => updateGrievance(id)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">Update</button>
                    <button onClick={() => deleteGrievance(id)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">Delete</button>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ManageComplaint
