import { useState, useEffect } from "react";
import "../css/loader.css"; 

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (progress < 100) {
            const timer = setTimeout(() => setProgress(prev => prev + 1), 20);
            return () => clearTimeout(timer);
        } else {
            const delay = setTimeout(() => onComplete?.(), 500); 
            return () => clearTimeout(delay);
        }
    }, [progress, onComplete]);

    return (
        <div className="boggero-loader">
        <h1 className="boggero-title">Boggero</h1>
        <div className="loader-bar">
            <div className="loader-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-percent">{progress}%</p>
        </div>
    );
};

export default Loader;