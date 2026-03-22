import { useContext } from "react";
import UserContext from "../context/UserProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if(loading) return null

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in
  return children;
};

export default ProtectedRoute;