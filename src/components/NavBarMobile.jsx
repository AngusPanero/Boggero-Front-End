import { Link } from "react-router-dom";
import { forwardRef } from "react";

const NavBarMobile = forwardRef(({ closeMenu, openLogin }, ref) => {
    const handleLoginClick = () => {
        closeMenu()
        openLogin()
    };

    return (
        <div className="mobile-menu" ref={ref}>
            <Link to="/alquiler" onClick={closeMenu}>Alquiler</Link>
            <Link to="/venta" onClick={closeMenu}>Venta</Link>
            <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
            <Link to="/nosotros" onClick={closeMenu}>Nosotros</Link>

        <button className="logout-mobile" onClick={handleLoginClick}>Administrador</button>
        </div>
    );
});

export default NavBarMobile;