import HeroBackground from "./HeroBackground"
import NavBar from "./NavBar"
import heroImage from "../assets/cocina-minimalista.jpg"
import boggeroImage from "../assets/boggero.png"
import Footer from "./Footer"
import WhatsApp from "./WhatsApp"
import OpenAi from "./OpenAi"

const Home = () => {
    return(
        <>
            <NavBar />
            <HeroBackground image={heroImage}>
                <img className="img-logo" src={boggeroImage} alt="Boggero-Logo" width={"550px"} />
                <h1>Viví Donde Siempre Soñaste</h1>
                <p>Propiedades en las mejores ubicaciones</p> <br />
                <button className="home btn liquid">Ver Propiedades</button>
            </HeroBackground>
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Home