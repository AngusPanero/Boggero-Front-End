import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import axios from "axios";
import NavBarMobile from "./NavBarMobile";
import useAuth from "../contexts/AuthContext";
import "../css/navBar.css";
import "../css/buttons.css";
import Loader from "./Loader";
import Error from "./Error";
import boggeroLogo from "../assets/boggero.png";    
import API_URL from "../config/api";

const NavBar = () => {
    const menuRef = useRef();
    const loginRef = useRef();
    const navigate = useNavigate()
    const { user, /* loadingContext */ loginContext, logoutContext } = useAuth()

    const [ menuOpen, setMenuOpen ] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false);

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const [ loadingOut, setLoadingOut ] = useState(false)
    const [ errorOut, setErrorOut ] = useState(false)

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

    // LOGIN
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(false)

            const userCredentials =  await signInWithEmailAndPassword( auth, email, password )
            loginContext(userCredentials.user)
            const idToken = await userCredentials.user.getIdToken()
            
            const response = await axios.post(`${API_URL}/login`, { idToken })
            if(response.status === 200){
                navigate("/admin")
            }
        } catch (error) {
            setError(true)
            console.error(`Error login user! 🔴 ${error}`);
        } finally {
            setLoading(false)
        }
    }
    // LOGOUT
    const handleLogout = async () => {
        try {
            setLoadingOut(true);
            const idToken = await auth.currentUser.getIdToken();

            const response = await axios.post(`${API_URL}/logout`, { idToken }, { withCredentials: true });

            if (response.status === 200) {
                logoutContext();
                navigate("/");
            }
        } catch (error) {
            setErrorOut(true);
            console.error("Error logging out session 🔴", error);
        } finally {
            setLoadingOut(false);
        }
    };

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

    if(loading) return <Loader />

    if(errorOut) return <Error errorMessage="Error cerrando sesión." />
    if(loadingOut) return <Loader />

    return(
        <header className="navbar">
            <img src={boggeroLogo} alt="boggeroLogo" onClick={() => navigate("/")} className="boggero-logo" width={"110PX"} />
        
            <nav className="center-links desktop-only">
                <Link to="/alquiler">Alquileres</Link>
                <Link to="/venta">Ventas</Link>
                <Link to="/contacto">Contacto</Link>
                <Link to="/nosotros">Nosotros</Link>
                {user && <Link to="/admin">Administrador</Link>}
            </nav>
        
            <div className="right-actions">
                {loading ? (
                    <p>...</p>
                ) : user ? (
                    <button className="logout desktop-only btn liquid" onClick={handleLogout}>Cerrar Sesión</button>
                ) : (
                    <button className="logout desktop-only btn liquid" onClick={toggleLoginForm}>Administrador</button>
                )}
                <button className="menu-btn mobile-only" onClick={toggleMenu}>☰</button>
            </div>

            {loginOpen && (
                <form className="admin-login-form" ref={loginRef} onSubmit={handleLogin}>
                    <input type="email" value={email} id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" value={password} id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    {error && (<p className="login-error"> Email o contraseña incorrectos </p>)}

                    <button className="btn liquid" type="submit">Iniciar</button>
                </form>
            )}
        
            {menuOpen && <NavBarMobile closeMenu={toggleMenu} ref={menuRef} openLogin={toggleLoginForm} />}
            </header>
        );
    };


export default NavBar