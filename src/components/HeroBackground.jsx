import "../css/HeroBackground.css"
import heroImage from "../assets/cocina-minimalista.jpg"


const HeroBackground = () => {
    return(
        <div className="hero-background" style={{ backgroundImage: `url(${heroImage})` }}></div>
    )
}

export default HeroBackground