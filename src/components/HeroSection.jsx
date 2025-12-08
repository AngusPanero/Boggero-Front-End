import "../css/HeroBackground.css"
import boggeroImage from "../assets/boggero.png"

const HeroSection = () => {
    return (
        <section className="hero-content">
            <img src={boggeroImage} className="img-logo" width={"600px"}/>
            <h1>Viví donde siempre soñaste</h1>
            <h3>Propiedades en las mejores ubicaciones</h3>
        </section>
    );
}

export default HeroSection;