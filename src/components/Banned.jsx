import "../css/error.css";
import HeroBackground from "./HeroBackground";

const Banned = () => {
    return (
        <>
        <HeroBackground />
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-title">Usuario Baneado por Seguridad.</h1>
                <p className="error-text small">No tienes acceso, ponte en contacto con el administrador.</p>
            </div>
        </div>
        </>
    );
};

export default Banned;