import { useState, useEffect, useRef } from "react";
import useSession from "../contexts/SessionMessageContext";
import { useDispatch } from "react-redux";
import { getHouses } from "../redux/slice";
import gptIcon from "../assets/gpt.png";    
import API_URL from "../config/api";
import "../css/OpenAi.css";

const OpenAi = () => {
    const dispatch = useDispatch()

    const { messages, handleSaveMessage } = useSession();

    const [modalAi, setModalAi] = useState(false);
    const [buttonModal, setButtonModal] = useState(true);

    const [openAiText, setOpenAiText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [streamingReply, setStreamingReply] = useState(""); 

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingReply, modalAi]);

    const chatRef = useRef(null);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    const toggleModal = () => {
        setModalAi(!modalAi);
        setButtonModal(!buttonModal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!openAiText.trim() || loading) return;

        try {
            setError(null);
            setLoading(true);
            setStreamingReply("");

            const fetchHouses = await dispatch(getHouses());

            const userMessage = { role: "user", content: openAiText.trim() };

            const payloadMessages = [...messages, userMessage];

            handleSaveMessage(userMessage);
            setOpenAiText("");

            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: payloadMessages, houses: fetchHouses.payload }),
            });

            if (!response.ok || !response.body) {
                throw new Error("No se pudo conectar con el asistente.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let fullReply = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullReply += chunk;

                setStreamingReply((prev) => prev + chunk);
            }

            if (fullReply.trim()) {
                handleSaveMessage({
                    role: "assistant",
                    content: fullReply.trim(),
                });
            }

            setStreamingReply("");
        } catch (err) {
            console.error("Error al comunicarse con OpenAI:", err);
            setError("Error al comunicarse con el asistente. Intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const renderMessages = () => (
        <div>
            {messages.map((msg, index) =>
                msg.role === "user" ? (
                    <p className="message-user" key={index}>
                        🙂: {msg.content}
                    </p>
                ) : (
                    <p className="message-bot" key={index}>
                        💻: {msg.content}
                    </p>
                )
            )}

            {loading && streamingReply && (
                <p className="message-bot">
                    💻: {streamingReply}
                </p>
            )}

            {loading && !streamingReply && (
                <h2 className="message-bot">Consultando IA...</h2>
            )}
        </div>
    );

    return (
        <>
            {buttonModal && (
                <img src={gptIcon} alt="gptIcon" onClick={toggleModal} className="openAi" width={"60PX"}/>
            )}

            <div className={modalAi ? "chat-box" : "chat-box-none"}>
                <button onClick={toggleModal} className="x-button">
                    ✖️
                </button>

                <div className="chat-content" ref={chatRef}>
                    {renderMessages()}
                    {error && <h2 style={{ color: "red" }}>{error}</h2>}
                </div>

                <form className={modalAi ? "form" : "form-none"} onSubmit={handleSubmit} >
                    <input className="input-form" type="text" id="openAi" name="openAi" value={openAiText} onChange={(e) => setOpenAiText(e.target.value)} placeholder="Pregunte..."disabled={loading}/>
                    <button className="button-form" type="submit" disabled={loading}>📨</button>
                </form>
            </div>
        </>
    );
};

export default OpenAi;