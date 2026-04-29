import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx';
import '@picocss/pico'
import './index.css'
import App from './App.jsx'

import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
