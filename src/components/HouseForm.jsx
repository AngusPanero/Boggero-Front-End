const HouseForm = ({  formData,  handleSubmit, handleSetValues,  handleImagesChange, handleRemoveImage, }) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Título" onChange={handleSetValues} required /> <br />
            <input type="text" name="direction" placeholder="Dirección" onChange={handleSetValues} required /> <br />
            <input type="text" name="ubication" placeholder="Ubicación" onChange={handleSetValues} required /> <br />
    
            <select name="operation" onChange={handleSetValues} required>
            <option value="">-- Operación --</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
            </select> <br />
    
            <input type="text" name="price" placeholder="Precio" onChange={handleSetValues} required /> <br />
            <input type="text" name="typeOfHouse" placeholder="Tipo de propiedad" onChange={handleSetValues} required /> <br />
    
            <textarea name="description" placeholder="Descripción" onChange={handleSetValues} required></textarea><br />
            <input type="text" name="condition" placeholder="Estado (ej: a estrenar)" onChange={handleSetValues} required /> <br />
            <input type="text" name="ambients" placeholder="Ambientes" onChange={handleSetValues} required /> <br />
            <input type="text" name="bathrooms" placeholder="Baños" onChange={handleSetValues} required /> <br />
            <input type="text" name="years" placeholder="Antigüedad (años)" onChange={handleSetValues} required /> <br />
            <input type="text" name="taxes" placeholder="Impuestos mensuales" onChange={handleSetValues} required /> <br />
            <input type="text" name="covered" placeholder="Metros cubiertos (m²)" onChange={handleSetValues} required /> <br />
            <input type="text" name="uncovered" placeholder="Metros descubiertos (m²)" onChange={handleSetValues} required /> <br />
            <input type="text" name="area" placeholder="Superficie total (m²)" onChange={handleSetValues} required /> <br />
            <input type="text" name="maps" placeholder="Link Google Maps" onChange={handleSetValues} required /> <br />
    
            <input type="file" name="imageUrl" accept="image/*" multiple onChange={handleImagesChange} required /> <br />
    
            {/* Previsualización de imágenes */}
            <div className="preview-container">
            {formData.imageUrl.map((file, index) => (
                <div key={index}>
                <img src={URL.createObjectURL(file)} alt={`img-${index}`} className="preview-img" width="100px" />
                <button type="button" onClick={() => handleRemoveImage(index)}>❌</button>
                </div>
            ))}
            </div>
    
            <button type="submit">Crear</button>
        </form>
        );
};

export default HouseForm;