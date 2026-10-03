import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../components/UserContext';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  const [fechaNacimiento, setFechaNacimiento] = useState('1994-05-24');
  const [genero, setGenero] = useState('');

  const [preguntaSeguridad, setPreguntaSeguridad] = useState('');
  const [respuestaSeguridad, setRespuestaSeguridad] = useState('');

  const { registrarUsuario } = useUser();
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !password.trim() || !genero || !preguntaSeguridad || !respuestaSeguridad.trim()) {
      alert('Por favor completa todos los campos requeridos, incluyendo la pregunta de seguridad.');
      return;
    }

    const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`;

    const registroExitoso = registrarUsuario({ 
      nombre: nombreCompleto, 
      correo, 
      password, 
      fechaNacimiento, 
      genero,
      preguntaSeguridad,
      respuestaSeguridad: respuestaSeguridad.toLowerCase().trim() 
    });

    if (registroExitoso) {
      alert(`¡Bienvenido/a, ${nombreCompleto}! Tu cuenta ha sido creada.`);
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
          
          <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
            <div className="w3-half w3-section">
              <label><i className="fa fa-user"></i> Nombre</label>
              <input 
                className="w3-input w3-border w3-round" 
                type="text" 
                placeholder="Ej. Andrés Esteban" 
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="w3-half w3-section">
              <label><i className="fa fa-user"></i> Apellidos</label>
              <input 
                className="w3-input w3-border w3-round" 
                type="text" 
                placeholder="Ej. Flórez Palacio" 
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
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

          <div className="w3-section w3-display-container">
            <label><i className="fa fa-lock"></i> Contraseña</label>
            <input 
              className="w3-input w3-border w3-round" 
              type={mostrarPassword ? "text" : "password"} 
              placeholder="********" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: '40px' }} 
            />
            <span 
              className="w3-display-right w3-padding" 
              style={{ cursor: 'pointer', marginTop: '24px' }} 
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              <i className={`fa ${mostrarPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>

          {/* --- SECCIÓN DE PREGUNTAS PROFESIONALES --- */}
          <div className="w3-row-padding" style={{ margin: '0 -16px', backgroundColor: '#f9f9f9', padding: '10px 0', borderRadius: '8px', marginBottom: '15px' }}>
            <div className="w3-half w3-section">
              <label><i className="fa fa-question-circle"></i> Pregunta de seguridad</label>
              <select 
                className="w3-select w3-border w3-round" 
                required 
                value={preguntaSeguridad} 
                onChange={(e) => setPreguntaSeguridad(e.target.value)}
              >
                <option value="" disabled>Selecciona una opción...</option>
                <option value="¿En qué ciudad se conocieron tus padres?">¿En qué ciudad se conocieron tus padres?</option>
                <option value="¿Cuál es el segundo nombre de tu primo mayor?">¿Cuál es el segundo nombre de tu primo mayor?</option>
                <option value="¿Cuál fue el nombre de tu primer jefe?">¿Cuál fue el nombre de tu primer jefe?</option>
                <option value="¿Cuál era el nombre de tu profesor favorito en la escuela primaria?">¿Cuál era el nombre de tu profesor favorito en la escuela primaria?</option>
              </select>
            </div>
            <div className="w3-half w3-section">
              <label><i className="fa fa-key"></i> Respuesta secreta</label>
              <input 
                className="w3-input w3-border w3-round" 
                type="text" 
                placeholder="Tu respuesta..." 
                required 
                value={respuestaSeguridad} 
                onChange={(e) => setRespuestaSeguridad(e.target.value)} 
              />
            </div>
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