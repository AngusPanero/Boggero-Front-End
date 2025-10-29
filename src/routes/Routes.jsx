import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Admin from "../components/Admin";

const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/"  element={<Home />}/>
                <Route path="/admin"  element={<Admin />}/>
            </Routes>
        </Router>
    )
}

export default AppRouter