import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Admin from "../components/Admin";
import PrivateRoute from "./PrivateRoute";
import Alquiler from "../components/Alquiler";
import Contacto from "../components/Contacto";
import Nosotros from "../components/Nosotros";
import Venta from "../components/Venta";

const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/"  element={<Home />}/>
                <Route path="/alquiler"  element={<Alquiler />}/>
                <Route path="/venta"  element={<Venta />}/>
                <Route path="/contacto"  element={<Contacto />}/>
                <Route path="/nosotros"  element={<Nosotros />}/>
                <Route path="/admin"  element={<PrivateRoute><Admin /></PrivateRoute>}/>
            </Routes>
        </Router>
    )
}

export default AppRouter