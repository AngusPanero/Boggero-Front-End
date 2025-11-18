import { useState } from "react"
import UpdateModal from "./UpdateModal"
import "../css/houseCard.css"

const HouseCard = ({ houseProp, deleteProp }) => {
    const [ imageNumber, setImageNumber ] = useState(0)
    const [ modalUpdate, setModalUpdate ] = useState(false)

    const prevImage = () => {
        setImageNumber((number) => number === 0 ? houseProp.imageUrl.length - 1 : number -1)
    }

    const nextImage = () => {
        setImageNumber((number) => number === houseProp.imageUrl.length -1 ? 0 : number +1)
    }

    return (
        <>
        <div className="house-card">          
            <h2 className="house-card-title">{houseProp?.title}</h2>
            <h4>Calle: {houseProp?.direction}</h4>

            {houseProp?.imageUrl.length === 1 ? <img className="image-card" src={houseProp?.imageUrl} alt={houseProp?.title} /> : 
            
            <div className="image-container">
                <button onClick={prevImage} className="carousel-btn left">{"<"}</button>
                <img className="image-card" src={houseProp?.imageUrl[imageNumber]} alt={houseProp?.title} />
                <button onClick={nextImage} className="carousel-btn right">{">"}</button>
            </div>
            }

            <p className="house-price">{houseProp.operation === "alquiler" ? `$ ${houseProp?.price},- Al Mes` : `U$S ${houseProp?.price},-`}</p>

            <div className="house-group">
                <p><strong>Ubicación:</strong> {houseProp?.ubication}</p>
                <p><strong>Operación:</strong> {houseProp?.operation.toUpperCase()}</p>
                <p><strong>Tipo:</strong> {houseProp?.typeOfHouse}</p>
                <p><strong>Expensas:</strong> {houseProp?.taxes}</p>
            </div>

            <div className="house-group">
                <p><strong>Amb:</strong> {houseProp?.ambients}</p>
                <p><strong>Baños:</strong> {houseProp?.bathrooms}</p>
                <p><strong>M²:</strong> {houseProp?.area}</p>
            </div>
            <button className="update-button" onClick={() => setModalUpdate(!modalUpdate)}>Actualizar</button>
            <button className="delete-button" onClick={deleteProp}>Borrar</button>
        </div>
        {modalUpdate && <UpdateModal house={houseProp} closeModal={() => setModalUpdate(!modalUpdate)} />}
        </>
    )
}

export default HouseCard