import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import axios from "axios";
import HouseForm from "./HouseForm";
import HeroBackground from "./HeroBackground";
import { createHouse, getHouses, deleteHouse } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import OpenAi from "./OpenAi";
import heroImage from "../assets/cocina-minimalista.jpg"
import WhatsApp from "./WhatsApp";
import Footer from "./Footer";
import HouseCard from "./HouseCard";
import "../css/admin.css"
import Loader from "./Loader";
import Error from "./Error";

const Admin = () => {
    const dispatch = useDispatch()
    const houses = useSelector((state) => state.houseSelector)

    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);    

    useEffect(() => {
        dispatch(getHouses())
        console.log(houses);
        
    }, [dispatch])

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

    // Drop Images
    const handleImagesDrop = (files) => {
        if (formData.imageUrl.length + files.length > 25) {
            alert("Solo podés subir hasta 25 imágenes");
            return;
        }
    
        setFormData(prev => ({
            ...prev,
            imageUrl: [...prev.imageUrl, ...files]
        }));
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

        try {
        setLoading(true)
        setError(false) 
        // 1. Subir imágenes
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
            setError(true)
            console.error("Error creando propiedad! 🔴", error);
            return
        } finally{
            setLoading(false); 
        }
    };

    if(error) return <Error />
    if(loading) return <Loader />

    return(
        <>
            <NavBar />
            <HeroBackground image={heroImage} />
            <section className="admin-content"> 
                
                <div className="houses-box">
                    {houses.houses?.map(house => (
                        <HouseCard deleteProp={() => dispatch(deleteHouse(house._id))} key={house._id} houseProp={house} />
                    ))}
                </div>
                <HouseForm formData={formData} handleImagesDrop={handleImagesDrop} handleSubmit={handleSubmit} handleSetValues={handleSetValues} handleImagesChange={handleImagesChange} handleRemoveImage={handleRemoveImage} />
            </section>
            
            <OpenAi />
            <WhatsApp />
            <Footer />
        </>
    )
}

export default Admin