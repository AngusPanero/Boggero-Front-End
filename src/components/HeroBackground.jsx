import "../css/HeroBackground.css"
import heroImage from "../assets/cocina-3.jpg"


const HeroBackground = () => {
    return(
        <div className="hero-background" style={{ backgroundImage: `url(${heroImage})` }}></div>
    )
}

export default HeroBackground