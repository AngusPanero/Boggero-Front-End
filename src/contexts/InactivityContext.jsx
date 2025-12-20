import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";

const useAutoLogout = (timeout = 15 * 60 * 1000) => {
    const { user, logoutContext } = useAuth();
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            await logoutContext();
            navigate("/");
        }, timeout);
    };

    useEffect(() => {
        if (!user) return;

        resetTimer();

        const events = [ "mousemove", "mousedown", "keydown", "scroll", "touchstart" ];

        events.forEach((event) =>
            window.addEventListener(event, resetTimer)
    );

        return () => {
            events.forEach((event) =>
                window.removeEventListener(event, resetTimer)
            );
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [user, timeout]);
};

export default useAutoLogout;