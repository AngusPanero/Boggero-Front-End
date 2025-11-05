import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        const storedMessage = JSON.parse(sessionStorage.getItem("sessionMessage"))
        if(storedMessage) setMessages(storedMessage)
    }, [])

    const handleSaveMessage = (message) => {
        setMessages(prevMessages => {
            const updated = [...prevMessages, message];
            sessionStorage.setItem("sessionMessage", JSON.stringify(updated));
            return updated;
        });
    }

    return(
        <SessionContext.Provider value={{ messages, handleSaveMessage }}>
            { children }
        </SessionContext.Provider>
    )
}

const useSession = () => useContext(SessionContext)
export default useSession