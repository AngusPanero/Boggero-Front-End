import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import axios from "axios";
import NavBarMobile from "./NavBarMobile";
import "../css/navBar.css";

const NavBar = () => {
    const menuRef = useRef();
    const loginRef = useRef();
    const navigate = useNavigate()

    const [ menuOpen, setMenuOpen ] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const toggleMenu = () => {
        // Funcion para menu mobile
        setMenuOpen(!menuOpen)
    }

    const toggleLoginForm = () => {
        // Funcion para inputs mobile
        setLoginOpen(!loginOpen)
    }

    const handleLogin = async (e) => {
        // Login
        e.preventDefault()
        try {
            setLoading(true)
            const userCredentials =  await signInWithEmailAndPassword( auth, email, password )
            const idToken = await userCredentials.user.getIdToken()
            
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { idToken })
            if(response.status = 200){
                navigate("/admin")
            }
        } catch (error) {
            setError(true)
            console.error(`Error login user! 🔴 ${error}`);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            // cerrar menú si se hace click fuera
            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
            // cerrar login si se hace click fuera
            if (loginOpen && loginRef.current && !loginRef.current.contains(e.target)) {
                setLoginOpen(false);
            }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [menuOpen, loginOpen]);

    if(error) return <h1>Error Iniciando Sesión!</h1>
    if(loading) return <h1>Iniciando Sesión...</h1>

    return (
        <header className="navbar">
            <h4 className="logo">Logo</h4>
        
            <nav className="center-links desktop-only">
                <Link to="/alquiler">Alquiler</Link>
                <Link to="/venta">Venta</Link>
                <Link to="/contacto">Contacto</Link>
                <Link to="/nosotros">Nosotros</Link>
            </nav>
        
            <div className="right-actions">
                <button className="logout desktop-only" onClick={toggleLoginForm}>Administrador</button>
                <button className="menu-btn mobile-only" onClick={toggleMenu}>☰</button>
            </div>

            {loginOpen && (
                <form className="admin-login-form" ref={loginRef} onSubmit={handleLogin}>
                    <input type="email" value={email} id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" value={password} id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit">Iniciar</button>
                </form>
            )}
        
            {menuOpen && <NavBarMobile closeMenu={toggleMenu} ref={menuRef} openLogin={toggleLoginForm} />}
            </header>
        );
    };


export default NavBar