import { Link } from "react-router-dom";
import { forwardRef } from "react";
import useAuth from "../contexts/AuthContext";

const NavBarMobile = forwardRef(({ closeMenu, openLogin }, ref) => {
    const { user, loading, logoutContext } = useAuth();

    const handleLoginClick = () => {
        closeMenu()
        openLogin()
    };

    const handleLogoutClick = () => {
        closeMenu()
        logoutContext()
    }

    if (loading) return <p>...</p>;

    return (
        <div className="mobile-menu" ref={ref}>
            <Link to="/alquiler" onClick={closeMenu}>Alquiler</Link>
            <Link to="/venta" onClick={closeMenu}>Venta</Link>
            <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
            <Link to="/nosotros" onClick={closeMenu}>Nosotros</Link>

            {user ?  <button className="btn liquid" onClick={handleLogoutClick}>Cerrar Sesión</button>
            : 
            <button className="btn liquid" onClick={handleLoginClick}>Administrador</button>
            }
        </div>
    );
});

export default NavBarMobile;