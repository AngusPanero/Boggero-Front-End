import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import Loader from "../components/Loader";
import useAuth from "../contexts/AuthContext";
import { auth } from "../firebase/firebase";

const PrivateRoute = ({ children }) => {
  const { user, loadingContext } = useAuth();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (loadingContext) return;

    if (!user) {
      setStatus("unauth");
      return;
    }

    const checkSession = async () => {
        const idToken = await auth.currentUser.getIdToken();
        try {
            await axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${idToken}` } }, { withCredentials: true });
            setStatus("ok");
        } catch (error) {
            if (error.response?.status === 403) {
            setStatus("banned");
            } else {
            setStatus("unauth");
            }
        }
    };

    checkSession();
  }, [user, loadingContext]);

  if (loadingContext || status === "loading") {
    return <Loader />;
  }

  if (status === "banned") {
    return <Navigate to="/banned" replace />;
  }

  if (status === "unauth") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;