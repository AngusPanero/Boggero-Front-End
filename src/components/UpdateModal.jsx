import { useState } from "react";
import { updateHouse,getHouses } from "../redux/slice";
import { useDispatch } from "react-redux";
import "../css/updateModal.css"

const UpdateModal = ({ house, closeModal }) => {
    const dispatch = useDispatch();

    const [imageIndex, setImageIndex] = useState(0);
    const [form, setForm] = useState({
        title: house.title,
        direction: house.direction,
        ubication: house.ubication,
        operation: house.operation,
        typeOfHouse: house.typeOfHouse,
        price: house.price,
        ambients: house.ambients,
        bathrooms: house.bathrooms,
        years: house.years,
        taxes: house.taxes,
        covered: house.covered,
        uncovered: house.uncovered,
        area: house.area,
        description: house.description,
        imageUrl: house.imageUrl
    });

    const nextImage = () => {
        setImageIndex(i => i === house.imageUrl.length - 1 ? 0 : i + 1);
    };

    const prevImage = () => {
        setImageIndex(i => i === 0 ? house.imageUrl.length - 1 : i - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(updateHouse({ id: house._id, form }))
        await dispatch(getHouses())
        closeModal()
    }

    return (
        <div className="modal-overlay">

            <div className="modal-content">

                <button className="close-btn" onClick={closeModal}>×</button>

                <div className="modal-left">

                    <h2>Actualizar Propiedad: {house.direction}</h2>

                    <form className="modal-form" onSubmit={handleSubmit}>

                        <p className="section-title">Datos Principales</p>
                        <div className="grid-2">
                            <div>
                                <label>Título:</label>
                                <input name="title" value={form.title} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Dirección:</label>
                                <input name="direction" value={form.direction} onChange={handleChange} />
                            </div>
                        </div>

                        <label>Ubicación:</label>
                        <input name="ubication" value={form.ubication} onChange={handleChange} />

                        <label>Descripción:</label>
                        <textarea name="description" value={form.description} onChange={handleChange} />

                        <p className="section-title">Características</p>
                        <div className="grid-2">
                            <div>
                                <label>Operación:</label>
                                <select name="operation" value={form.operation} onChange={handleChange}>
                                    <option value="venta">Venta</option>
                                    <option value="alquiler">Alquiler</option>
                                </select>
                            </div>
                            <div>
                                <label>Tipo:</label>
                                <input name="typeOfHouse" value={form.typeOfHouse} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Ambientes:</label>
                                <input name="ambients" value={form.ambients} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Baños:</label>
                                <input name="bathrooms" value={form.bathrooms} onChange={handleChange} />
                            </div>
                        </div>

                        <p className="section-title">Dimensiones</p>
                        <div className="grid-2">
                            <div>
                                <label>Años:</label>
                                <input name="years" value={form.years} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Expensas:</label>
                                <input name="taxes" value={form.taxes} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Cubierto:</label>
                                <input name="covered" value={form.covered} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Descubierto:</label>
                                <input name="uncovered" value={form.uncovered} onChange={handleChange} />
                            </div>

                            <div>
                                <label>M² Totales:</label>
                                <input name="area" value={form.area} onChange={handleChange} />
                            </div>

                            <div>
                                <label>Precio:</label>
                                <input name="price" value={form.price} onChange={handleChange} />
                            </div>
                        </div>

                        <button className="update-button" type="submit">Guardar Cambios</button>

                    </form>
                </div>

                {/* DERECHA: FOTOS GRANDES */}
                <div className="modal-right">
                    <button className="carousel-btn left-btn" onClick={prevImage}>{"<"}</button>

                    <img 
                        className="modal-image" 
                        src={house.imageUrl[imageIndex]} 
                        alt={house.title} 
                    />

                    <button className="carousel-btn right-btn" onClick={nextImage}>{">"}</button>
                </div>

            </div>
        </div>
    );
};

export default UpdateModal;
