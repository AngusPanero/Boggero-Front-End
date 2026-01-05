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
import useAutoLogout from "../contexts/InactivityContext";
import { auth } from "../firebase/firebase";

const Admin = () => {
    useAutoLogout()
    const dispatch = useDispatch()
    const houses = useSelector((state) => state.houseSelector)

    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);    

    useEffect(() => {
        dispatch(getHouses())
        
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
        try {
            const urls = [];
            for (const file of files) {
                const imgData = new FormData();
                imgData.append("file", file);
                imgData.append("upload_preset", "Boggero");

                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    imgData
                );
                if (!response?.data?.secure_url) {
                    throw new Error("CLOUDINARY_ERROR");
                }
                urls.push(response.data.secure_url);
            }
            return urls;
        } catch (error) {
            console.error("Error en Cloudinary", error);
            throw new Error("CLOUDINARY_ERROR");
        }
    }; 

    // Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);

            const token = await auth.currentUser.getIdToken();

            const uploadedUrls = await uploadImagesToCloudinary(formData.imageUrl);

            const finalData = { ...formData, imageUrl: uploadedUrls };

            await dispatch(createHouse({ data: finalData, token })).unwrap();

        } catch (error) {
            console.error("Error creando propiedad 🔴", error);

            if (error.message === "CLOUDINARY_ERROR") {
                setError("cloudinary");
            } else {
                setError("general");
            }
        } finally {
            setLoading(false);
        }
    };

    // Delete House 
    const handleDeleteHouse = async (id) => {
        try {
            const token = await auth.currentUser.getIdToken()

            await dispatch(deleteHouse({ id, token }));
            await dispatch(getHouses())
        } catch (error) {
            console.error("Error deleting house 🔴", error)
        }
    }

    if(error === "cloudinary") {
        return <Error errorMessage="Error en Cloudinary" />;
    }

    if(error === "general") {
        return <Error errorMessage="Error creando propiedad." />;
    }
    if(loading) return <Loader />

    return(
        <>
            <NavBar />
            <HeroBackground image={heroImage} />
            <section className="admin-content"> 
                
                <div className="houses-box">
                    {houses.houses?.map(house => (
                        <HouseCard deleteProp={handleDeleteHouse} key={house._id} houseProp={house} />
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