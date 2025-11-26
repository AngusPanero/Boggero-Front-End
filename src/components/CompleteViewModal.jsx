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

            {/* ================= COLUMNA IZQUIERDA (DATOS) ================= */}
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

            {/* ================= COLUMNA DERECHA (IMÁGENES) ================= */}
            <div className="complete-right">

            <div className="image-box">
                <button className="complete-carousel-btn complete-left-btn" onClick={prevImage}>{"<"}</button>
                <img className="complete-image" src={houseProp?.imageUrl[imageIndex]} alt={houseProp?.title} />
                <button className="complete-carousel-btn complete-right-btn" onClick={nextImage}>{">"}</button>
            </div>
            
            <div>
                <iframe
                className="complete-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.6556720410626!2d-58.56955442646497!3d-34.64359323127923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc7ee69c0b003%3A0xc0c0967451210e6a!2sAlsina%20419%2C%20B1704%20Ramos%20Mej%C3%ADa%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1764195545461!5m2!1ses-419!2sar"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            </div>

        </div>
        </div>
    );
};

export default CompleteViewModal;