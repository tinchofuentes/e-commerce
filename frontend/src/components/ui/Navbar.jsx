import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/img/tendencias-logo.png';

export function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // Hook to control the burger button
  const [clicked, setClicked] = useState(false);
  // Hook to control the courses submenu
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // Function to handle the click on the burger button
  const handleClick = () => {
    setClicked(!clicked); // When it is true it changes it to false and vice versa
    setSubmenuOpen(false); // Close the submenu if the main menu is closed
  };

  // Function to handle the click on the "Courses" button
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="navbar_container">
      <div className="navbar_top">
        <div className="navbar_logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h2>
            TENDENCIAS<span>AG</span>
          </h2>
        </div>
        <div className="navbar_user">
          <Link
            to="/"
            className="relative text-gray-700 hover:text-blue-600"
            onClick={handleClick}
          >
            <ShoppingCart className="carrito" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link
            to="/perfil"
            className="text-gray-700 hover:text-blue-600"
            onClick={handleClick}
          >
            <User className="user_profile" />
          </Link>
        </div>
        <div className="burger" onClick={handleClick}>
          <Menu />
        </div>
      </div>
      <div className={`links ${clicked ? 'active' : ''}`}>
        <Link onClick={handleClick} to="/">
          Inicio
        </Link>
        <div className="dropdown">
          <Link
            to="/productos"
            onClick={(e) => {
              e.preventDefault();
              toggleSubmenu();
            }}
          >
            Productos
            <ChevronDown
              className={`icono-flecha ${submenuOpen ? 'abierto' : ''}`}
            />
          </Link>

          <div className={`submenu ${submenuOpen ? 'open' : ''}`}>
            <Link onClick={handleClick} to="/productos/remeras">
              Remeras
            </Link>
            <Link onClick={handleClick} to="/productos/buzos">
              Buzos
            </Link>
            <Link onClick={handleClick} to="/productos/calzas">
              Calzas
            </Link>
            <Link onClick={handleClick} to="/productos/bikers">
              Bikers
            </Link>
          </div>
        </div>
        <Link onClick={handleClick} to="/contacto">
          Contacto
        </Link>
        <Link onClick={handleClick} to="/politicas">
          Política de cambios o devoluciones
        </Link>
      </div>
      {/* <div className="whatsapp-button">
        <a
          href="https://wa.me/5493512860200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
        </a>
      </div> */}
    </div>
  );
}

export default Navbar;
