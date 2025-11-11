const ContactForm = ({ handleSubmitForm, handleSetValues, formData }) => {
    return (
        <section className="contact-container">
            <div className="contact-content">
            <div className="contact-info">
                <h1 className="contact-title">¡Contáctanos!</h1>
                <p className="contact-text">
                ¿Querés <span>comprar</span>, <span>alquilar</span> o <span>vender</span> una propiedad?
                En <strong>Boggero Propiedades</strong> te acompañamos en cada paso para
                que tomes decisiones con confianza y seguridad.
                </p>

                <p className="contact-text">
                    Nuestro equipo está especializado en encontrar las mejores oportunidades
                    según tus necesidades y presupuesto. Ya sea que busques tu próximo hogar,
                    una inversión rentable o simplemente asesoramiento, estamos para ayudarte.
                </p>

                <p className="contact-text">
                    Completá el formulario y nos pondremos en contacto contigo lo antes posible
                    para ofrecerte una atención personalizada. Valoramos tu tiempo y queremos
                    que cada consulta se convierta en una experiencia ágil, clara y profesional.
                </p>
            </div>
    
            <form className="contact-form" onSubmit={handleSubmitForm}>
                <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleSetValues("name", e.target.value)}
                    placeholder="Tu nombre"
                    required
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="lastName">Apellido</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleSetValues("lastName", e.target.value)}
                    placeholder="Tu apellido"
                    required
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleSetValues("phone", e.target.value)}
                    placeholder="Ej: 11-0000-0000"
                    required
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="type">Tipo de Consulta</label>
                <select
                    onChange={(e) => handleSetValues("type", e.target.value)}
                    value={formData.type}
                    name="type"
                    id="type"
                    required
                >
                    <option value="Información">Información</option>
                    <option value="Alquiler">Alquiler</option>
                    <option value="Compra">Compra</option>
                    <option value="Venta">Venta</option>
                    <option value="Tasación">Tasación</option>
                </select>
                </div>
    
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleSetValues("email", e.target.value)}
                    placeholder="tuemail@ejemplo.com"
                    required
                />
                </div>
    
                <div className="form-group full">
                <label htmlFor="comment">Comentario</label>
                <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={(e) => handleSetValues("comment", e.target.value)}
                    placeholder="Contanos más sobre tu consulta..."
                    required
                ></textarea>
                </div>
    
                <button type="submit" className="btn liquid">
                Enviar
                </button>
            </form>
            </div>
        </section>
    );
};

export default ContactForm;