import axios from "axios"
import { useState } from "react";
import useSession from "../contexts/SessionMessageContext";

const OpenAi = ({}) => {
    const { messages, handleSaveMessage } = useSession()

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
                <p key={index}>
                    <strong>{msg.role === "user" ? "🧑 Usuario:" : "🤖 IA:"}</strong> {msg.content}
                </p>
            ))}
        </div>
    );
    
    return(
        <>
            <h2>OpenAI</h2>
            {renderMessages()}

            {loading && <h2>Consultando IA...</h2>}

            {error && <h2 style={{ color: "red" }}>{error}</h2>}
            
            <form onSubmit={handleSubmit}>
                <input type="text" id="openAi" name="openAi" value={openAiText} onChange={(e) => setOpenAiText(e.target.value)} placeholder="Pregunte..." />
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default OpenAi;