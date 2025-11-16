import axios from "axios"
import { useState } from "react";
import useSession from "../contexts/SessionMessageContext";
import "../css/OpenAi.css"

const OpenAi = ({}) => {
    const { messages, handleSaveMessage } = useSession()

    const [ modealAi, setModalAi ] = useState(false)
    const [ buttonModal, setButtonModal ] = useState(true)

    const [ openAiText, setOpenAiText ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(false)
            setLoading(true)     

            handleSaveMessage({ "role": "user", "content": `${openAiText}` }) // Guardar mensaje del usuario en el context

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { "messages": [ ...messages, { "role": "user", "content": `${openAiText}` }]})

            handleSaveMessage({ "role": "assistant", "content": `${response.data.reply}` }) // Guardar mensaje del usuario en el context
            
            setOpenAiText("")
        } catch (error) {
            setError(true)
            console.error(`Error al comunicarse con OpenAI: ${error}`);
            throw new Error("Error al comunicarse con OpenAI");
        } finally {
            setLoading(false)
        }
    }

    const renderMessages = () => (
        <div>
            {messages.map((msg, index) => (
                msg.role === "user" ? <p className="message-user" key={index}>🙂: {msg.content}</p> : <p className="message-bot" key={index}>💻: {msg.content}</p>
            ))}
        </div>
    );

    const hadleButtons = () => {
        setModalAi(!modealAi)
        setButtonModal(!buttonModal)
    }
    
    return(
        <>
        {buttonModal ? <button onClick={hadleButtons} className="openAi">OpenAi</button> : null}

        <div className={modealAi ? "chat-box" : "chat-box-none"}>
            <button onClick={hadleButtons} className="x-button">✖️</button>
            <div className="chat-content">
                {renderMessages()}

                {loading && <h2 className="message-bot">Consultando IA...</h2>}

                {error && <h2 style={{ color: "red" }}>{error}</h2>}
                
            </div>
            <form className={modealAi ? "form" : "form-none"} onSubmit={handleSubmit}>
                <input className="input-form" type="text" id="openAi" name="openAi" value={openAiText} onChange={(e) => setOpenAiText(e.target.value)} placeholder="Pregunte..." />
                <button className="button-form" type="submit">📨</button>
            </form>
        </div>
        </>
    )
}

export default OpenAi;