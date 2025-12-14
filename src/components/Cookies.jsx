import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/cookies.css";

const CookiesBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookiesAccepted");
        if (!accepted) {
            const timer = setTimeout(() => {
                setVisible(true);
            }, 2000);

            return () => clearTimeout(timer); 
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <>
            <div className="cookie-banner">
                <p>
                    Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptás su uso.{" "}
                    <Link to="/politicacookies">Leer más</Link>
                </p>
                <button onClick={acceptCookies}>Aceptar</button>
            </div>
        </>
    );
};

export default CookiesBanner;