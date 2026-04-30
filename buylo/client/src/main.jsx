import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import '@picocss/pico'
import './index.css'
import App from './App.jsx'

<<<<<<< HEAD
import { CartProvider } from './context/CartContext.jsx';
=======
import { CartProvider } from './context/CartContext.jsx'; 
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
<<<<<<< HEAD
          <ToastProvider>
            <App />
          </ToastProvider>
=======
          <App />
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
