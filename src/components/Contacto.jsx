import { useState } from "react"
import axios from "axios"
import NavBar from "./NavBar"
import { useNavigate } from "react-router-dom"
import ContactForm from "./ContactForm"

const Contacto = () => {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ formData, setFormData ] = useState({ name: "", lastName: "", phone: "", email: "", type: "", comment: "" })

    const handleSetValues = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value })) // [name]: value ] name va en array para declararlo como key y el prev hace que se vaya sumando todo al objeto inicial
    }
    // Nodemailer
    const handleSubmitNodemailer = async () => {
        try {
            const responseNodemailer = await axios.post(`${import.meta.env.VITE_API_URL}/sendemail`, formData);
            if (responseNodemailer.status !== 200) {
                throw new Error("Error al enviar el correo.");
            }
        } catch (error) {
            setError(true);
            console.error(`Error al enviar el correo: ${error.message}`);
            throw error; 
        }
    };
    // Form DB
    const handleSubmit = async () => {
        try {
            const responseDb = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
            if (responseDb.status === 201) {
                navigate("/gracias");
            }
        } catch (error) {
            setError(true);
            console.error(`Error al guardar los datos en la base de datos: ${error.message}`);
            throw error; 
        }
    };
    
    // Ambas Funciones
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            await handleSubmitNodemailer();
            await handleSubmit();
        } catch (error) {
            setError(true);
            console.error(`Error al procesar el formulario: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };  

    if(loading) return <h2>Enviando...</h2> /* <Spinner /> */
    if(error) return <h2>Error Al Enviar Formulario</h2> /* <Error /> */

    return(
        <>
            <NavBar />
            <ContactForm handleSetValues={handleSetValues} handleSubmitForm={handleSubmitForm} formData={formData} />
        </>
    )
}

export default Contacto