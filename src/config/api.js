const API_URL = window.location.hostname === "localhost" ? import.meta.env.VITE_API_URL : "http://192.168.1.164:2105";

export default API_URL;