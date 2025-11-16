import "../css/HouseForm.css"

const HouseForm = ({  formData,  handleSubmit, handleSetValues,  handleImagesChange, handleRemoveImage, handleImagesDrop}) => {
    return (
        <form className="house-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Título" onChange={handleSetValues} required /> 
            <input type="text" name="direction" placeholder="Dirección" onChange={handleSetValues} required /> 
            <input type="text" name="ubication" placeholder="Ubicación" onChange={handleSetValues} required /> 
    
            <select name="operation" onChange={handleSetValues} required>
            <option value="">-- Operación --</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
            </select> 
    
            <input type="text" name="price" placeholder="Precio" onChange={handleSetValues} required /> 
            <input type="text" name="typeOfHouse" placeholder="Tipo de propiedad" onChange={handleSetValues} required /> 
    
            <textarea name="description" placeholder="Descripción" onChange={handleSetValues} required></textarea>
            <input type="text" name="condition" placeholder="Estado (ej: a estrenar)" onChange={handleSetValues} required /> 
            <input type="text" name="ambients" placeholder="Ambientes" onChange={handleSetValues} required /> 
            <input type="text" name="bathrooms" placeholder="Baños" onChange={handleSetValues} required /> 
            <input type="text" name="years" placeholder="Antigüedad (años)" onChange={handleSetValues} required /> 
            <input type="text" name="taxes" placeholder="Impuestos mensuales" onChange={handleSetValues} required /> 
            <input type="text" name="covered" placeholder="Metros cubiertos (m²)" onChange={handleSetValues} required /> 
            <input type="text" name="uncovered" placeholder="Metros descubiertos (m²)" onChange={handleSetValues} required /> 
            <input type="text" name="area" placeholder="Superficie total (m²)" onChange={handleSetValues} required /> 
            <input type="text" name="maps" placeholder="Link Google Maps" onChange={handleSetValues} required /> 
    
            <input type="file" name="imageUrl" accept="image/*" multiple onChange={handleImagesChange} required /> 

            <div 
                className="dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    handleImagesDrop(files);
                }}
            >
                <p>Arrastrá y soltá tus imágenes aquí</p>
            </div>

            {/* Previsualización de imágenes */}
            <div className="preview-container">
            {formData.imageUrl.map((file, index) => (
                <div key={index}>
                <img src={URL.createObjectURL(file)} alt={`img-${index}`} className="preview-img" width="100px" />
                <button type="button" onClick={() => handleRemoveImage(index)}>X</button>
                </div>
            ))}
            </div>
            <button type="submit">Crear</button>
        </form>
        );
};

export default HouseForm;