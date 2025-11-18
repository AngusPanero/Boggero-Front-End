import NavBar from "./NavBar"
import Footer from "./Footer"
import WhatsApp from "./WhatsApp"
import OpenAi from "./OpenAi"
import HeroSection from "./HeroSection"
import HeroBackground from "./HeroBackground"

const Home = () => {
    return(
        <>
            <HeroBackground /> 
            <NavBar />
            <HeroSection />
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Home