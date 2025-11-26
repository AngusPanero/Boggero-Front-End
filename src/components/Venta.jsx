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

const Venta = () => {
    const dispatch = useDispatch()
    const houseProp = useSelector((state) => state.houseSelector)

    const [ openModal, setOpenModal ] = useState(false)

    useEffect(() => {
        dispatch(getHouses())
        console.log(houseProp);
        
    }, [dispatch])

    return(
        <>
            <NavBar />
            <HeroBackground />
            <section className="section">
                {houseProp.houses?.map((house) => <HouseClientCard key={house._id} houseProp={house}/>)} 
            </section>
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Venta