import { useState } from "react";
import "../css/completeViewModal.css";

const CompleteViewModal = ({ houseProp, closeModal }) => {
    const [imageIndex, setImageIndex] = useState(0);

    const prevImage = () => {
        setImageIndex((n) =>
        n === 0 ? houseProp.imageUrl.length - 1 : n - 1
        );
    };

    const nextImage = () => {
        setImageIndex((n) =>
        n === houseProp.imageUrl.length - 1 ? 0 : n + 1
        );
    };

    return (
        <div className="complete-overlay">
        <div className="complete-content">

            <button className="complete-close-btn" onClick={closeModal}>×</button>
            <div className="complete-left">

            <h3 className="complete-section-title">Información General</h3>

            <div className="complete-field">
                <p><strong>Título:</strong> {houseProp?.title}</p>
            </div>

            <div className="complete-field">
                <p><strong>Dirección:</strong> {houseProp?.direction}</p>
            </div>

            <div className="complete-field">
                <p><strong>Ubicación:</strong> {houseProp?.ubication}</p>
            </div>

            <h3 className="complete-section-title">Detalles</h3>

            <div className="complete-grid-2">
                <div className="complete-field">
                <p><strong>Operación:</strong> {houseProp?.operation}</p>
                </div>

                <div className="complete-field">
                <p><strong>Tipo:</strong> {houseProp?.typeOfHouse}</p>
                </div>

                <div className="complete-field">
                <p><strong>Ambientes:</strong> {houseProp?.ambients}</p>
                </div>

                <div className="complete-field">
                <p><strong>Baños:</strong> {houseProp?.bathrooms}</p>
                </div>

                <div className="complete-field">
                <p><strong>Años:</strong> {houseProp?.years}</p>
                </div>

                <div className="complete-field">
                <p><strong>Expensas:</strong> {houseProp?.taxes}</p>
                </div>
            </div>

            <h3 className="complete-section-title">Descripción</h3>

            <div className="complete-field complete-description">
                <p>{houseProp?.description}</p>
            </div>

            <h3 className="complete-section-title">Superficie</h3>

            <div className="complete-grid-2">
                <div className="complete-field">
                <p><strong>Cubiertos:</strong> {houseProp?.covered}</p>
                </div>

                <div className="complete-field">
                <p><strong>Descubiertos:</strong> {houseProp?.uncovered}</p>
                </div>
            </div>

            <div className="complete-field">
                <p><strong>Total:</strong> {houseProp?.area} m²</p>
            </div>

            <h3 className="complete-section-title">Precio</h3>

            <div className="complete-field">
                <p>
                <strong>
                    {houseProp?.operation === "alquiler" ? "$" : "U$S"}
                </strong>{" "}
                {houseProp?.price}
                </p>
            </div>

            </div>

            <div className="complete-right">

            <div className="image-box">
                <button className="complete-carousel-btn complete-left-btn" onClick={prevImage}>{"<"}</button>
                <img className="complete-image" src={houseProp?.imageUrl[imageIndex]} alt={houseProp?.title} />
                <button className="complete-carousel-btn complete-right-btn" onClick={nextImage}>{">"}</button>
            </div>
            
            <div>
                <iframe 
                    className="complete-map" src={houseProp.maps} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CompleteViewModal;