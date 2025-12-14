import NavBar from "./NavBar"
import HeroBackground from "./HeroBackground"
import OpenAi from "./OpenAi"
import WhatsApp from "./WhatsApp"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { getHouses } from "../redux/slice"
import HouseClientCard from "./HouseClientCard"
import { useEffect, useState } from "react"
import "../css/houseClientCard.css"
import CookiesBanner from "./Cookies"

const Venta = () => {
    const dispatch = useDispatch()
    const houseProp = useSelector((state) => state.houseSelector)

    useEffect(() => {
        dispatch(getHouses())
        console.log(houseProp);
        
    }, [dispatch])

    return(
        <>
            <NavBar />
            <CookiesBanner />
            <HeroBackground />
            <section className="section-box">
                <div>
                    <h1 className="title-alquiler">Propiedades en Venta Disponibles:</h1>
                </div>

                <div className="section">
                {houseProp.houses?.filter(house => house.operation === "venta").map(house => (
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

export default Venta