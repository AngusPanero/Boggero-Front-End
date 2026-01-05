import NavBar from "./NavBar"
import HeroBackground from "./HeroBackground"
import OpenAi from "./OpenAi"
import WhatsApp from "./WhatsApp"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { getHouses } from "../redux/slice"
import HouseClientCard from "./HouseClientCard"
import { useEffect } from "react"
import "../css/houseClientCard.css"
import CookiesBanner from "./Cookies"

const Alquiler = () => {
    const dispatch = useDispatch()
    const houseProp = useSelector((state) => state.houseSelector)

    useEffect(() => {
        dispatch(getHouses())
        
    }, [dispatch])

    return(
        <>
            <NavBar />
            <CookiesBanner />
            <HeroBackground />
            <section className="section-box">
                <div>
                    <h1 className="title-alquiler">Propiedades en Alquiler Disponibles:</h1>
                </div>

                <div className="section">
                    {houseProp.houses?.filter(house => house.operation === "alquiler").map(house => (
                            <HouseClientCard key={house._id} houseProp={house} />
                        ))
                    }
                </div>
            </section>
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Alquiler