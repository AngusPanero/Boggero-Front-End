import { useState } from "react";
import "../css/houseClientCard.css";

const HouseClientCard = ({ houseProp }) => {
    const [imageNumber, setImageNumber] = useState(0);

    const prevPage = () => {
        setImageNumber((n) =>
            n === 0 ? houseProp.imageUrl.length - 1 : n - 1
        );
    };

    const nextPage = () => {
        setImageNumber((n) =>
            n === houseProp.imageUrl.length - 1 ? 0 : n + 1
        );
    };

    return (
        <>
        <div className="client-house-card">    
            <div className="img-box">
                <h2 className="client-house-card-title">{houseProp?.title}</h2>
                {houseProp?.imageUrl.length === 1 ? <img className="client-image-card" src={houseProp?.imageUrl} alt={houseProp?.title} /> : 
                
                <div className="client-image-container">
                    <button onClick={prevPage} className="client-carousel-btn left">{"<"}</button>
                    <img className="client-image-card" src={houseProp?.imageUrl[imageNumber]} alt={houseProp?.title} />
                    <button onClick={nextPage} className="client-carousel-btn right">{">"}</button>
                </div>
                }
            </div>      

            <div className="info-box">
                <h4 className="client-house-card-direction">{houseProp?.direction.toUpperCase()}</h4>
                <p className="client-house-price">{houseProp.operation === "alquiler" ? `$ ${houseProp?.price},-` : `U$S ${houseProp?.price},-`}</p>

                <div className="client-house-group">
                    <p><strong>Ubicación:</strong> {houseProp?.ubication}</p>
                    <p><strong>Operación:</strong> {houseProp?.operation.toUpperCase()}</p>
                    <p><strong>Tipo:</strong> {houseProp?.typeOfHouse}</p>
                    <p><strong>Expensas:</strong> {houseProp?.taxes}</p>
                </div>

                <div className="client-house-group">
                    <p><strong>Amb:</strong> {houseProp?.ambients}</p>
                    <p><strong>Baños:</strong> {houseProp?.bathrooms}</p>
                    <p><strong>M²:</strong> {houseProp?.area}</p>
                </div>
                <button className="client-view-more-button">Ver Más</button>
            </div>
        </div>
        </>
    );
};

export default HouseClientCard;