import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isExpanding, setIsExpanding] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpanding(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsExpanding(false);
    }, 400); // Syncs with the transition duration
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Common Validation
    if (!email || !password) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
    }

    try {
        const config = { headers: { "Content-Type": "application/json" } };

        if (isLogin) {
            // LOGIN LOGIC
            const { data } = await axios.post("/api/user/login", { email, password }, config);
            toast.success("Login Successful");
            localStorage.setItem("userInfo", JSON.stringify(data));

            setName("");
            setEmail("");
            setPassword("");

            navigate("/dashboard");
        } else {
            // REGISTER LOGIC
            if (!email || !password) {
              toast.error("Please fill all the fields");
              setLoading(false);
              return;
            }
            const { data } = await axios.post("/api/user/register", { name, email, password }, config);
            toast.success("Registration Successful");
            localStorage.setItem("userInfo", JSON.stringify(data));

            setName("");
            setEmail("");
            setPassword("");

            navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <div className="relative w-full max-w-[850px] h-[580px] bg-white rounded-3xl shadow-2xl overflow-hidden hidden md:block border border-gray-100">
        
        {/* Full-Cover Sliding Overlay */}
        <div 
          className={`absolute top-0 h-full bg-gradient-to-br from-blue-600 to-indigo-800 z-40 transition-all duration-500 ease-in-out flex flex-col items-center justify-center text-white p-12 text-center shadow-2xl ${
            isExpanding ? 'w-full left-0' : 'w-1/2 ' + (isLogin ? 'left-1/2' : 'left-0')
          }`}
        >
          <div className={`transition-opacity duration-300 ${isExpanding ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-3xl font-bold mb-4">{isLogin ? "New Here?" : "Welcome Back!"}</h2>
            <p className="mb-8 text-blue-100 max-w-xs mx-auto">
              {isLogin ? "Sign up now and discover all the features we've built for you." : "To keep connected with us please login with your personal account."}
            </p>
            <button 
              onClick={handleToggle} 
              className="border-2 border-white px-12 py-2 rounded-full font-bold hover:bg-white hover:text-blue-700 transition-all active:scale-95"
            >
              {isLogin ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>
        </div>

        {/* Static Forms Container */}
        <div className="relative w-full h-full flex">
          {/* Login Side (Visible when overlay is on the right) */}
          <div className={`w-1/2 h-full flex flex-col items-center justify-center p-12 transition-opacity duration-300 ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Sign In</h2>
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6 w-full max-w-xs">
              <button onClick={() => setIsAdmin(false)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${!isAdmin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>User</button>
              <button onClick={() => setIsAdmin(true)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${isAdmin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Admin</button>
            </div>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder={`${isAdmin ? 'Admin' : 'User'} Email`} className="w-full max-w-xs p-4 mb-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" className="w-full max-w-xs p-4 mb-6 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="w-full max-w-xs py-4 bg-blue-600 text-white font-bold rounded-xl uppercase hover:bg-blue-700 transition shadow-lg" onClick={submitHandler}>Login</button>
          </div>

          {/* Signup Side (Visible when overlay is on the left) */}
          <div className={`w-1/2 h-full flex flex-col items-center justify-center p-12 transition-opacity duration-300 ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Create Account</h2>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Full Name" className="w-full max-w-xs p-4 mb-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" className="w-full max-w-xs p-4 mb-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" className="w-full max-w-xs p-4 mb-6 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="w-full max-w-xs py-4 bg-indigo-600 text-white font-bold rounded-xl uppercase hover:bg-indigo-700 transition shadow-lg" onClick={submitHandler}>Register</button>
          </div>
        </div>
      </div>

      {/* Mobile Simplified Form */}
      <div className="md:hidden w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isLogin ? "Sign In" : "Sign Up"}</h2>
        <div className="space-y-4">
          {isLogin && (
            <div className="flex bg-gray-200 p-1 rounded-lg">
              <button onClick={() => setIsAdmin(false)} className={`flex-1 py-1 rounded text-xs ${!isAdmin ? 'bg-white text-blue-600' : ''}`}>User</button>
              <button onClick={() => setIsAdmin(true)} className={`flex-1 py-1 rounded text-xs ${isAdmin ? 'bg-white text-blue-600' : ''}`}>Admin</button>
            </div>
          )}
          {!isLogin && <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Name" className="w-full p-4 rounded-xl bg-gray-100" />}
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" className="w-full p-4 rounded-xl bg-gray-100" />
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" className="w-full p-4 rounded-xl bg-gray-100" />
          <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg" onClick={submitHandler} >{isLogin ? 'Login' : 'Sign Up'}</button>
          <button onClick={handleToggle} className="w-full mt-4 text-blue-600 font-semibold text-sm">
            {isLogin ? "Create an account" : "Back to login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuth
