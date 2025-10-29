import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)

    return(
        <AuthContext.Provider value={{}}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = useContext(AuthContext)
export default useAuth