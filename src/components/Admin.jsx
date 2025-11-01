import { useState } from "react"
import NavBar from "./NavBar"
import axios from "axios";
import { createHouse } from "../redux/slice";
import { useDispatch } from "react-redux";

const Admin = () => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        title: "",       
        direction: "",    
        operation: "",   
        ubication: "",    
        price: "",       
        typeOfHouse: "",  
        description: "",
        condition: "",    
        ambients: "",
        bathrooms: "",
        years: "",
        taxes: "",
        covered: "",
        uncovered: "",
        area: "",
        maps: "",
        imageUrl: []
    });
    
    // Set Values con parametros
    const handleSetValues = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    // Max 25 Imagenes
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (formData.imageUrl.length + files.length > 25) {
            alert("Solo puedes subir hasta 25 imágenes");
            return;
        }
        setFormData((prev) => ({ ...prev, imageUrl: [...prev.imageUrl, ...files] }));
    };
    
    // Remove Image
    const handleRemoveImage = (index) => {
        setFormData((prev) => ({ ...prev, imageUrl: prev.imageUrl.filter((_, i) => i !== index) }));};

    // Subir a Cloudinary
    const uploadImagesToCloudinary = async (files) => {
        const urls = [];
        for (const file of files) {
            const imgData = new FormData();
            imgData.append("file", file);
            imgData.append("upload_preset", "Boggero");
    
            const res = await axios.post( `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, imgData);
            urls.push(res.data.secure_url);
        }
        return urls;
    };    

    // Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try { // 1. Subir imágenes
        const uploadedUrls = await uploadImagesToCloudinary(formData.imageUrl);

        // 2. Crear objeto final 
        const finalData = { ...formData, imageUrl: uploadedUrls };
            console.log(finalData);
            
        // 3. Enviar a Redux thunk
        dispatch(createHouse(finalData));

        // 4. Reset
        setFormData({
            title: "", direction: "", operation: "", ubication: "",
            price: "", typeOfHouse: "", description: "", condition: "",
            ambients: "", bathrooms: "", years: "", taxes: "",
            covered: "", uncovered: "", area: "", maps: "",
            imageUrl: []
        });

        } catch (error) {
        console.error("Error creando propiedad! 🔴", error);
        }
    };

    return(
        <>
            <NavBar />
            <h1>Publicar!</h1>

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

                {/* Preview Imagenes */}
                <div className="preview-container">
                    {formData.imageUrl.map((file, index) => (
                        <div key={index}>
                        <img src={URL.createObjectURL(file)} alt={`img-${index}`} className="preview-img" width={"100px"}/>
                        <button type="button" onClick={() => handleRemoveImage(index)}>❌</button>
                        </div>
                    ))}
                </div>

                <button type="submit">Crear</button>
            </form>
        </>
    )
}

export default Admin