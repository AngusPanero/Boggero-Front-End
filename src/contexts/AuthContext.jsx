import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ loadingContext, setLoadingContext ] = useState(true)

    const loginContext = (user) => {
        setUser(user)
    }

    const logoutContext = async () => {
        await auth.signOut()
        setUser(null)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if(firebaseUser){
                setUser(firebaseUser)
                await firebaseUser.getIdToken()
            } else {
                setUser(null)
            }
            setLoadingContext(false)
        })
        return () => unSubscribe()
    }, [])

    return(
        <AuthContext.Provider value={{ user, setUser, loadingContext, loginContext, logoutContext }}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)
export default useAuth