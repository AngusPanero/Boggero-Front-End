import "../css/HeroBackground.css"

const HeroBackground = ({ image, height = "100vh", children }) => {
    return(
        <section className="hero-background" style={{ backgroundImage: `url(${image})`, height }}>
            <div className="hero-overlay">
                { children }
            </div>
        </section>
    )
}

export default HeroBackground