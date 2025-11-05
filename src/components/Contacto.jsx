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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(false)
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData)
            if(response.status === 201){
                navigate("/gracias")
            }
        } catch (error) {
            setError(true)
            console.error(`Error al enviar el formulario de contacto: ${error}`);
            throw new Error(`Error al enviar el formulario de contacto: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    if(loading) return <h2>Enviando...</h2> /* <Spinner /> */
    if(error) return <h2>Error Al Enviar Formulario</h2> /* <Error /> */

    return(
        <>
            <NavBar />
            <ContactForm handleSetValues={handleSetValues} handleSubmit={handleSubmit} formData={formData} />
        </>
    )
}

export default Contacto