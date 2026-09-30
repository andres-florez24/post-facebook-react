import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../components/UserContext';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('1994-05-24');
  const [genero, setGenero] = useState('');

  const { login } = useUser();
  const navigate = useNavigate();

  // Cambia la extracción del useUser para traer registrarUsuario:
  const { registrarUsuario } = useUser();
  

  const handleRegistro = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !password.trim() || !genero) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    // Intentamos registrar al usuario en la "base de datos"
    const registroExitoso = registrarUsuario({ nombre, correo, password, fechaNacimiento, genero });

    if (registroExitoso) {
      alert(`¡Bienvenido/a, ${nombre}! Tu cuenta ha sido creada.`);
      navigate('/');
    } else {
      alert('❌ Ese correo ya está registrado. Por favor, usa otro o inicia sesión.');
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '600px', marginTop: '100px', marginBottom: '50px' }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center"><i className="fa fa-user-plus"></i> Crear cuenta</h2>
        </div>

        <form className="w3-container w3-padding-24" onSubmit={handleRegistro}>
          
          <div className="w3-section">
            <label><i className="fa fa-user"></i> Nombre completo</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="text" 
              placeholder="Ej. Juan Pérez" 
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="w3-section">
            <label><i className="fa fa-envelope"></i> Correo electrónico</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="email" 
              placeholder="tu@email.com" 
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="w3-section">
            <label><i className="fa fa-lock"></i> Contraseña</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="password" 
              placeholder="********" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w3-section">
            <label><i className="fa fa-calendar"></i> Fecha de nacimiento</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>

          <div className="w3-section">
            <label><i className="fa fa-venus-mars"></i> Género</label>
            <select 
              className="w3-select w3-border w3-round" 
              required
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="w3-section">
            <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block w3-section">
              <i className="fa fa-user-plus"></i> Registrarse
            </button>
          </div>

          <p className="w3-center">
            ¿Ya tienes cuenta? <Link to="/login" className="w3-text-theme"><strong>Inicia sesión aquí</strong></Link>.
          </p>
        </form>

      </div>
    </div>
  );
}