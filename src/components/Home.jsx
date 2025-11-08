import HeroBackground from "./HeroBackground"
import NavBar from "./NavBar"
import heroImage from "../assets/cocina-minimalista.jpg"
import boggeroImage from "../assets/boggero.png"
import Footer from "./Footer"
import WhatsApp from "./WhatsApp"

const Home = () => {
    return(
        <>
            <NavBar />
            <HeroBackground image={heroImage}>
                <img src={boggeroImage} alt="Boggero-Logo" width={"550px"} />
                <h1>Viví Donde Siempre Soñaste</h1>
                <p>Propiedades en las mejores ubicaciones</p> <br />
                <button className="btn liquid">Ver Propiedades</button>
            </HeroBackground>
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Home