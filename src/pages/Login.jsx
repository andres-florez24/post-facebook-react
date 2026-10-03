import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../components/UserContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, obtenerPreguntaSeguridad, recuperarPassword } = useUser();
  const navigate = useNavigate();

  // --- ESTADOS PARA EL MODAL DE RECUPERACIÓN ---
  const [showModal, setShowModal] = useState(false);
  const [pasoRecuperacion, setPasoRecuperacion] = useState(1); 
  const [emailRecuperar, setEmailRecuperar] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [passwordRecuperada, setPasswordRecuperada] = useState('');

  const handleAcceder = (e) => {
    e.preventDefault();
    if (!correo.trim() || !password.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }
    const credencialesCorrectas = login(correo, password);
    if (credencialesCorrectas) {
      navigate('/'); 
    } else {
      alert('❌ Error: El correo o la contraseña son incorrectos.'); 
    }
  };

  // --- FUNCIONES DEL MODAL DE RECUPERACIÓN ---
  const abrirModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    setPasoRecuperacion(1); // Siempre arranca en el paso 1 (pedir correo)
    setEmailRecuperar('');
    setRespuestaUsuario('');
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const verificarCorreo = () => {
    if (!emailRecuperar.trim()) return;
    const pregunta = obtenerPreguntaSeguridad(emailRecuperar.trim());
    
    if (pregunta) {
      setPreguntaSecreta(pregunta); // Guardamos la pregunta para mostrarla
      setPasoRecuperacion(2);       // Avanzamos al paso 2
    } else {
      alert("❌ Ese correo no está registrado en el sistema.");
    }
  };

  const verificarRespuesta = () => {
    if (!respuestaUsuario.trim()) return;
    const pass = recuperarPassword(emailRecuperar.trim(), respuestaUsuario.trim());
    
    if (pass) {
      setPasswordRecuperada(pass);
      setPasoRecuperacion(3); // Avanzamos al paso 3 (mostrar contraseña)
    } else {
      alert("❌ Respuesta incorrecta. Inténtalo de nuevo.");
    }
  };

  return (
    <>
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

            {/* ENLACE PARA ABRIR EL MODAL */}
            <p className="w3-center w3-margin-bottom">
              <a href="#" className="w3-text-theme" onClick={abrirModal} style={{ cursor: 'pointer' }}>
                ¿Olvidaste tu contraseña?
              </a>
            </p>

            <p className="w3-center">
              ¿No tienes cuenta? <Link to="/registro" className="w3-text-theme"><strong>Regístrate aquí</strong></Link>.
            </p>
          </form>

        </div>
      </div>

      {/* --- CUADRO MODAL BONITO PARA RECUPERAR CONTRASEÑA --- */}
      {showModal && (
        <div className="w3-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="w3-modal-content w3-card-4 w3-animate-zoom w3-round-large" style={{ maxWidth: '500px' }}>
            
            <header className="w3-container w3-theme-d2 w3-round-large">
              <span onClick={cerrarModal} className="w3-button w3-display-topright w3-round-large w3-hover-red">&times;</span>
              <h3>Recuperación de cuenta</h3>
            </header>

            <div className="w3-container w3-padding-24">
              
              {/* PASO 1: PEDIR CORREO */}
              {pasoRecuperacion === 1 && (
                <>
                  <p>Por favor, ingresa tu correo electrónico para buscar tu cuenta:</p>
                  <input 
                    className="w3-input w3-border w3-round w3-margin-bottom" 
                    type="email" 
                    placeholder="tu@email.com" 
                    value={emailRecuperar}
                    onChange={(e) => setEmailRecuperar(e.target.value)}
                  />
                  <button className="w3-button w3-theme-d1 w3-round w3-right" onClick={verificarCorreo}>
                    Siguiente <i className="fa fa-arrow-right"></i>
                  </button>
                </>
              )}

              {/* PASO 2: MOSTRAR PREGUNTA SECRETA Y PEDIR RESPUESTA */}
              {pasoRecuperacion === 2 && (
                <>
                  <p><strong>Pregunta de seguridad:</strong></p>
                  <p className="w3-text-theme w3-large">{preguntaSecreta}</p>
                  
                  <input 
                    className="w3-input w3-border w3-round w3-margin-bottom" 
                    type="text" 
                    placeholder="Escribe tu respuesta..." 
                    value={respuestaUsuario}
                    onChange={(e) => setRespuestaUsuario(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && verificarRespuesta()}
                  />
                  
                  <button className="w3-button w3-theme-d1 w3-round w3-right" onClick={verificarRespuesta}>
                    Recuperar contraseña <i className="fa fa-unlock"></i>
                  </button>
                </>
              )}

              {/* PASO 3: MOSTRAR LA CONTRASEÑA */}
              {pasoRecuperacion === 3 && (
                <div className="w3-center">
                  <h4 className="w3-text-green"><i className="fa fa-check-circle w3-xxlarge"></i></h4>
                  <h4>¡Identidad verificada!</h4>
                  <p>Tu contraseña es:</p>
                  <div className="w3-panel w3-light-grey w3-padding-16 w3-round w3-large">
                    <strong>{passwordRecuperada}</strong>
                  </div>
                  <p className="w3-small w3-opacity">(En una aplicación real, se enviaría por correo en lugar de mostrarla en pantalla).</p>
                  
                  <button className="w3-button w3-theme-d1 w3-round w3-block w3-margin-top" onClick={cerrarModal}>
                    Volver al Inicio de Sesión
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}