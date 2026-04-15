import { useState , useEffect } from 'react'
import { Link, useRoutes } from 'react-router-dom';
import logo from './assets/logo.svg'
import './App.css'

import { 
  CatalogPage, 
  ProductDetailsPage, 
  CartPage, 
  CheckoutPage, 
  SignUpPage, 
  LoginPage, 
  ProfilePage, 
  AdminDashboardPage, 
  EditProductPage 
} from './pages';




const App = () => {
  // const [ products, setProducts ] = useState([])

  let element = useRoutes([
    {
      path:"/",
      element:<CatalogPage />
    },
    {
      path:"/product/:id",
      element:<ProductDetailsPage />
    },
    {
      path:"/cart",
      element:<CartPage />
    },
    {
      path:"/checkout",
      element:<CheckoutPage />
    },
    {
      path:"/signup",
      element:<SignUpPage />
    },
    {
      path:"/login",
      element:<LoginPage />
    },
    { 
      path:"/profile",
      element:<ProfilePage />
    },
    {
      path:"/admin",
      element:<AdminDashboardPage />
    },
    {
      path:"/admin/edit/:id",
      element:<EditProductPage />
    }


  ])


  return (
    <>     
      <nav className="container">
        <ul>
          <li>
            <Link to="/" className="brand-link">
              <img src={logo} alt="" className="brand-logo" />
              <span className="brand-name">Buylo</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li><Link to="/">Shop</Link></li>
          <li><Link to="/cart" role="button" className="secondary">Cart</Link></li>
          <li><Link to="/login" role="button" className="outline">Login</Link></li>
        </ul>
      </nav>

      {/* The <main> tag with "container" keeps your content centered and responsive */}
      <main className="container">
        {element}
      </main>

      <footer className="container">
        <small>© 2026 Buylo • Minimalist Shopping</small>
      </footer>
    </>
  );
}

export default App
