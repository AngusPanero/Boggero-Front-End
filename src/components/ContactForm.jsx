const ContactForm = ({ handleSubmitForm, handleSetValues, formData }) => {
    return(
        <>
            <h1>Contacto!</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="name">Nombre: </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={(e) => handleSetValues("name", e.target.value)} placeholder="Nombre" required /> <br />

                <label htmlFor="lastName">Apellido: </label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={(e) => handleSetValues("lastName", e.target.value)} placeholder="Apellido" required /> <br />

                <label htmlFor="phone">Teléfono: </label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={(e) => handleSetValues("phone", e.target.value)} placeholder="Teléfono" required /> <br />

                <label htmlFor="type">Tipo de Consulta: </label> 
                <select onChange={(e) => handleSetValues("type", e.target.value)} value={formData.type} name="type" id="type" required> 
                    <option value="Información">Información</option>
                    <option value="Alquiler">Alquiler</option>
                    <option value="Compra">Compra</option>
                    <option value="Venta">Venta</option>
                    <option value="Tasación">Tasación</option>
                </select> <br />

                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={(e) => handleSetValues("email", e.target.value)} placeholder="Email" required /> <br />

                <label htmlFor="comment">Comentario: </label>
                <textarea type="text" id="comment" name="comment" value={formData.comment} onChange={(e) => handleSetValues("comment", e.target.value)} placeholder="Cuentenos más sobre su consulta" required></textarea> <br />

                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default ContactForm