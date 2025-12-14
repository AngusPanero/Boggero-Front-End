import NavBar from "./NavBar"
import Footer from "./Footer"
import WhatsApp from "./WhatsApp"
import OpenAi from "./OpenAi"
import HeroSection from "./HeroSection"
import HeroBackground from "./HeroBackground"
import CookiesBanner from "./Cookies"

const Home = () => {
    return(
        <>
            <HeroBackground /> 
            <CookiesBanner />
            <NavBar />
            <HeroSection />
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Home