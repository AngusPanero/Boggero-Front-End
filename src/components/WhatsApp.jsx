import wp from "../assets/wp.png"
import "../../src/App.css"

const WhatsApp = ( ) => {
    return(
        <a href={import.meta.env.VITE_WHATSAPP} target="_blank" rel="noopener noreferrer">
                <img className="logo-wp" src={wp} alt="logo-whatsApp" />
            </a>
    )
}

export default WhatsApp