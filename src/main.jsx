import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SessionProvider } from './contexts/SessionMessageContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </AuthProvider>
    </Provider>  
  </StrictMode>,
)
