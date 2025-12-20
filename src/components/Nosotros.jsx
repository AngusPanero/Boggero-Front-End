import NavBar from "./NavBar"
import HeroBackground from "./HeroBackground"
import OpenAi from "./OpenAi"
import WhatsApp from "./WhatsApp"
import Footer from "./Footer"
import betina from "../assets/betina-2.jpg"
import "../css/nosotros.css"
import CookiesBanner from "./Cookies";

const Nosotros = () => {
    return(
        <>
            <NavBar />
            <CookiesBanner />
            <HeroBackground />
            <section className="nosotros-section">
                <div className="nosotros-card">
                    
                    <div className="nosotros-image-wrapper">
                    <div className="image-glow" />
                    <img src={betina} alt="Betina Boggero" className="nosotros-image" />

                    <div className="nosotros-caption">
                        <h3>Betina Boggero</h3>
                        <span>Matrícula Nro. 1049</span>
                    </div>
                    </div>

                <div className="nosotros-text">
                    <p>
                    <strong>Boggero Propiedades</strong> es una empresa dedicada a la intermediación y al
                    asesoramiento inmobiliario, orientada a brindar un servicio profesional,
                    claro y responsable en operaciones de compra, venta y alquiler de
                    propiedades.

                    Nuestro trabajo se basa en el acompañamiento personalizado de cada
                    cliente, entendiendo que cada operación inmobiliaria requiere atención,
                    tiempo y conocimiento del mercado. Actuamos con seriedad, transparencia
                    y compromiso, respetando la normativa vigente y priorizando siempre la
                    seguridad jurídica de las partes involucradas.

                    A lo largo de su trayectoria, <strong>Boggero Propiedades</strong> ha construido una
                    relación de confianza con sus clientes, basada en la honestidad, el
                    trato directo y la correcta gestión de cada operación, desde la primera
                    consulta hasta su finalización.
                    </p>

                    <p>
                    Betina es la titular y responsable de <strong>Boggero Propiedades</strong>,
                    Martillera y Corredora Pública, Matrícula Nro. 1049, cuenta con una
                    sólida experiencia en el mercado inmobiliario, desempeñándose con
                    responsabilidad, compromiso y vocación profesional.

                    Su forma de trabajo se caracteriza por la atención personalizada, la
                    claridad en cada etapa del proceso y el cumplimiento estricto de las
                    normas que regulan la actividad inmobiliaria. Cada operación es
                    abordada de manera individual, con el objetivo de brindar seguridad y
                    confianza a todas las partes intervinientes.
                    </p>
                    </div>

                </div>
            </section>
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Nosotros