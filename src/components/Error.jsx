import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/error.css";
import HeroBackground from "./HeroBackground";

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <HeroBackground />
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-title">¡Error Interno del Servidor!</h1>
                <p className="error-text small">Serás redirigido automáticamente al inicio.</p>
            </div>
        </div>
        </>
    );
};

export default Error;