import React, { useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Send, MapPin, Phone, AlertCircle, FileText, ClipboardList, Dot } from 'lucide-react';
import {GrievanceContext} from '../context/GrievanceProvider';
import SideBar from '../components/SideBar';
import { useLocation, useNavigate } from 'react-router-dom';

const LodgeGrivances = () => {
  
  const {createComplaint, updateComplaint} = useContext(GrievanceContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("complaint");
  const [formData, setFormData] = useState({
    district: '',
    address: '',
    pincode: '',
    priority: 'Medium',
    contactNum: '',
    complaintTitle: '',
    complaintDetails: ''
  });

  const editingGrievance = location.state?.grievance;
  useEffect(() => {
    if (editingGrievance) {
        setFormData({
        district: editingGrievance.district,
        address: editingGrievance.address,
        pincode: editingGrievance.pincode,
        priority: editingGrievance.priority,
        contactNum: editingGrievance.contactNum,
        complaintTitle: editingGrievance.complaintTitle,
        complaintDetails: editingGrievance.complaintDetails
        });
    }
    }, [editingGrievance]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingGrievance) {
        await updateComplaint(editingGrievance._id, formData);
        toast.success("Grievance updated successfully!");
        setFormData({ district: '', address: '', pincode: '', priority: 'Medium', contactNum: '', complaintTitle: '', complaintDetails: '' });
        navigate('/dashboard')
      } else {
        await createComplaint(formData);
        toast.success("Grievance lodged successfully!");
        setFormData({ district: '', address: '', pincode: '', priority: 'Medium', contactNum: '', complaintTitle: '', complaintDetails: '' });
        navigate('/dashboard')
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* 1. Sidebar stays on the left */}
            <SideBar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            />

            {/* 2. Main Content Area on the right */}
            <main className="flex-1 p-4 md:p-8 h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                
                {/* The Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#2D60FF] to-[#1E3A8A] p-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2">Lodge New Grievance</h2>
                    <p className="text-blue-100 text-sm mt-1">
                    Please provide accurate details to help us resolve your issue faster.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ... rest of your form inputs stay exactly the same ... */}
                    
                    {/* Title - Full Width */}
                    <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <FileText size={16} /> Complaint Title
                        <Dot size={28} className="text-red-500 -ml-1" />
                    </label>
                    <input 
                        required name="complaintTitle" value={formData.complaintTitle} onChange={handleChange}
                        placeholder="Brief summary of the issue"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D60FF] outline-none transition"
                    />
                    </div>

                    {/* District & Pincode */}
                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <MapPin size={16} /> District
                        <Dot size={28} className="text-red-500 -ml-1" />
                    </label>
                    <input required name="district" value={formData.district} onChange={handleChange} placeholder="e.g. South 24 parganas" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D60FF] outline-none transition" />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Pincode<Dot size={28} className="text-red-500 -ml-1" /></label>
                    <input required type="number" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit code" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D60FF] outline-none transition" />
                    </div>

                    {/* Contact & Priority */}
                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Phone size={16} /> Contact Number<Dot size={28} className="text-red-500 -ml-1" /></label>
                    <input required name="contactNum" value={formData.contactNum} onChange={handleChange} placeholder="Mobile number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D60FF] outline-none transition" />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><AlertCircle size={16} /> Priority Level</label>
                    <select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#2D60FF] outline-none transition">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    </div>

                    {/* Address & Details */}
                    <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Detailed Address</label>
                    <textarea required name="address" value={formData.address} onChange={handleChange} placeholder="Street, Landmark, etc." rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D60FF] outline-none transition"></textarea>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><ClipboardList size={16} /> Full Description<Dot size={28} className="text-red-500 -ml-1" /></label>
                    <textarea required name="complaintDetails" value={formData.complaintDetails} onChange={handleChange} placeholder="Describe the issue..." rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2D60FF] outline-none transition"></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                    <button 
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#2D60FF] hover:bg-[#1E3A8A] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : <><Send size={18}/> Submit Grievance</>}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </main>
        </div>
    );
};

export default LodgeGrivances;