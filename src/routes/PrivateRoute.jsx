import { Navigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loadingContext } = useAuth()

    if(loadingContext) return <h1>Verificando Sesión</h1>
    
    return(
        user ? children : <Navigate to="/"/>
    )
}

export default PrivateRoute