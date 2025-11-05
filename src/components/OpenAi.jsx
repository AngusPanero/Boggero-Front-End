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

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { "messages": [{ "role": "user", "content": `${openAiText}` }]})

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

    if (loading) return <h2>Consultando IA...</h2>
    if (error) return <h2>Error Al Consultar IA</h2>

    return(
        <>
            <h2>OpenAI</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="openAi">Consúltale a IA...</label> <br />
                <input type="text" id="openAi" name="openAi" value={openAiText} onChange={(e) => setOpenAiText(e.target.value)} placeholder="Pregunte..." />

                <button type="submit">Enviar</button>
            </form>

            {messages.map((msg, index) => <p key={index}><strong>{msg.role === "user" ? "🧑 Usuario:" : "🤖 IA:"}</strong> {msg.content}</p>)}
            {openAiText && <p><strong>🧑 Usuario:</strong> {openAiText}</p>}
        </>
    )
}

export default OpenAi;