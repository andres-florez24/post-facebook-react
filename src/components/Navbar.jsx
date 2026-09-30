import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

export default function Navbar() {
  // Extraemos la información del usuario y las funciones de sesión
  const { usuarioActual: miUsuario, autenticado, logout } = useUser();
  
  // Estado para abrir y cerrar el menú móvil (pantallas pequeñas)
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  
  const navigate = useNavigate();

  // Función para cerrar la sesión y enviar al usuario al login
  const handleCerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w3-top">
      {/* Barra superior de navegación */}
      <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
        
        {/* Botón de hamburguesa para celulares */}
        <button 
          type="button"
          className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" 
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
          style={{ background: 'transparent', border: 'none' }}
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* Logo que lleva al Inicio */}
        <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
          <i className="fa fa-home w3-margin-right"></i>Logo
        </Link>

        {/* --- OPCIONES CUANDO LA SESIÓN ESTÁ INICIADA --- */}
        {autenticado ? (
          <>
            {/* Perfil */}
            <Link to="/perfil" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Perfil">
              <i className="fa fa-user"></i>
            </Link>

            {/* Mensajes / Chat */}
            <Link to="/mensajes" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Mensajes">
              <i className="fa fa-envelope"></i>
            </Link>

            {/* Grupos */}
            <Link to="/grupos" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Grupos">
              <i className="fa fa-users"></i>
            </Link>

            {/* Notificaciones desplegables */}
            <div className="w3-dropdown-hover w3-hide-small">
              <button type="button" className="w3-button w3-padding-large" title="Notificaciones">
                <i className="fa fa-bell"></i>
                <span className="w3-badge w3-right w3-small w3-green">3</span>
              </button>
              <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{ width: '300px' }}>
                <span className="w3-bar-item w3-button">Una nueva solicitud de amistad</span>
                <span className="w3-bar-item w3-button">John Doe publicó en tu muro</span>
                <span className="w3-bar-item w3-button">A Jane le gusta tu publicación</span>
              </div>
            </div>

            {/* Botón Salir / Cerrar sesión */}
            <button 
              type="button" 
              className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-red" 
              onClick={handleCerrarSesion}
              title="Cerrar sesión"
            >
              <i className="fa fa-sign-out"></i> Salir
            </button>

            {/* Configuración (engranaje) */}
            <Link to="/configuracion" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Configuración">
              <i className="fa fa-cog"></i>
            </Link>

            {/* Avatar de tu usuario */}
            <Link to="/perfil" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Mi Cuenta">
              <img 
                src={miUsuario?.foto || "https://www.w3schools.com/w3images/avatar2.png"} 
                className="w3-circle" 
                style={{ height: '23px', width: '23px' }} 
                alt="Avatar" 
              />
            </Link>
          </>
        ) : (
          /* --- OPCIONES CUANDO NO HAY SESIÓN INICIADA --- */
          <div className="w3-right">
            <Link to="/login" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">
              <i className="fa fa-sign-in"></i> Iniciar sesión
            </Link>
            <Link to="/registro" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">
              <i className="fa fa-user-plus"></i> Registrarse
            </Link>
          </div>
        )}
      </div>

      {/* Menú desplegable para móviles */}
      {menuMovilAbierto && (
        <div className="w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large">
          {autenticado ? (
            <>
              <Link to="/" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Inicio</Link>
              <Link to="/perfil" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Perfil</Link>
              <Link to="/mensajes" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Mensajes</Link>
              <Link to="/grupos" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Grupos</Link>
              <Link to="/configuracion" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Configuración</Link>
              <button type="button" className="w3-bar-item w3-button w3-padding-large w3-text-red" onClick={handleCerrarSesion}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Iniciar sesión</Link>
              <Link to="/registro" className="w3-bar-item w3-button w3-padding-large" onClick={() => setMenuMovilAbierto(false)}>Registrarse</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}