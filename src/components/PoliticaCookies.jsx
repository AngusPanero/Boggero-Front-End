import NavBar from "./NavBar"
import Footer from "./Footer"
import "../css/politicaCookies.css"
import CookiesBanner from "./Cookies"
import HeroBackground from "./HeroBackground"
import OpenAi from "./OpenAi"
import WhatsApp from "./WhatsApp"

const PoliticaCookies = () => {
    return (
        <>
            <NavBar />
            <CookiesBanner />
            <HeroBackground />
            <section className="cookies-container">
                <h1 className="cookies-title">Política de Cookies</h1>
                <p className="cookies-text">
                    En Boggero Propiedades utilizamos cookies para mejorar tu experiencia de navegación y ofrecerte un servicio personalizado. Al continuar navegando en nuestro sitio, entendemos que aceptás su uso.
                </p>

                <h2>¿Qué son las cookies?</h2>
                <p className="cookies-text">
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitás un sitio web. Sirven para recordar tus preferencias, entender cómo interactuás con nuestro contenido y ayudarte a tener una experiencia más fluida.
                </p>

                <h2>¿Qué tipos de cookies usamos?</h2>
                <ul className="cookies-list">
                    <li><strong>Cookies esenciales:</strong> necesarias para que el sitio funcione correctamente.</li>
                    <li><strong>Cookies de rendimiento:</strong> nos permiten analizar el uso del sitio y mejorar su funcionamiento.</li>
                    <li><strong>Cookies de funcionalidad:</strong> recuerdan tus preferencias para brindarte una experiencia más personalizada.</li>
                    <li><strong>Cookies de terceros:</strong> como redes sociales o servicios externos que usamos para mejorar nuestro contenido.</li>
                </ul>

                <h2>¿Cómo puedo gestionar las cookies?</h2>
                <p className="cookies-text">
                    Podés configurar tu navegador para aceptar o rechazar cookies, o para que te notifique cuando se envía una. Tené en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio.
                </p>
            </section>
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default PoliticaCookies;