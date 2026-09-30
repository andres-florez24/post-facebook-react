import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../components/UserContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleAcceder = (e) => {
    e.preventDefault();

    if (!correo.trim() || !password.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Le pasamos el correo y contraseña a la nueva función de login
    const credencialesCorrectas = login(correo, password);

    if (credencialesCorrectas) {
      navigate('/'); // Entra al muro
    } else {
      alert('❌ Error: El correo o la contraseña son incorrectos.'); // Te frena
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '500px', marginTop: '100px', marginBottom: '50px' }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center"><i className="fa fa-sign-in"></i> Iniciar sesión</h2>
        </div>

        <form className="w3-container w3-padding-24" onSubmit={handleAcceder}>
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
            <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block w3-section">
              <i className="fa fa-sign-in"></i> Acceder
            </button>
          </div>

          <p className="w3-center">
            ¿No tienes cuenta? <Link to="/registro" className="w3-text-theme"><strong>Regístrate aquí</strong></Link>.
          </p>
        </form>

      </div>
    </div>
  );
}