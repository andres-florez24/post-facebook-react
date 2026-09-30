import React, { useState } from 'react';
import { useUser } from '../components/UserContext';

export default function Settings() {
  const miUsuario = useUser();

  // 1. Estado para controlar qué pestaña está abierta ('general', 'privacidad' o 'notificaciones')
  const [pestanaActiva, setPestanaActiva] = useState('general');

  // 2. Estados para los campos de la pestaña General
  const [nombre, setNombre] = useState(miUsuario?.nombre || 'Juan Pérez');
  const [correo, setCorreo] = useState('juan@email.com');
  const [bio, setBio] = useState('Estudiante Técnico Laboral, CESDE.');

  // 3. Estados para las opciones de Privacidad
  const [verPerfil, setVerPerfil] = useState('Solo amigos');
  const [solicitudes, setSolicitudes] = useState('Amigos de amigos');
  const [password, setPassword] = useState('');

  // 4. Estados para las casillas de Notificaciones
  const [notifCorreo, setNotifCorreo] = useState(true);
  const [notifMensajes, setNotifMensajes] = useState(true);
  const [notifCumpleanos, setNotifCumpleanos] = useState(false);
  const [notifGrupos, setNotifGrupos] = useState(true);

  // Funciones simples para los botones
  const handleGuardarGeneral = (e) => {
    e.preventDefault();
    alert('¡Información personal guardada con éxito!');
  };

  const handleGuardarPrivacidad = (e) => {
    e.preventDefault();
    alert('¡Preferencias de privacidad actualizadas!');
  };

  const handleGuardarNotificaciones = (e) => {
    e.preventDefault();
    alert('¡Preferencias de notificaciones guardadas!');
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1000px', marginTop: '80px', marginBottom: '40px' }}>
      <div className="w3-card w3-round w3-white">
        
        {/* Cabecera */}
        <div className="w3-container w3-padding-16 w3-theme-d2">
          <h2><i className="fa fa-cogs"></i> Configuración de la cuenta</h2>
        </div>

        {/* Botones de las Pestañas */}
        <div className="w3-bar w3-theme-l4">
          <button 
            type="button"
            className={`w3-bar-item w3-button ${pestanaActiva === 'general' ? 'w3-theme-d1' : ''}`}
            onClick={() => setPestanaActiva('general')}
          >
            General
          </button>
          <button 
            type="button"
            className={`w3-bar-item w3-button ${pestanaActiva === 'privacidad' ? 'w3-theme-d1' : ''}`}
            onClick={() => setPestanaActiva('privacidad')}
          >
            Privacidad
          </button>
          <button 
            type="button"
            className={`w3-bar-item w3-button ${pestanaActiva === 'notificaciones' ? 'w3-theme-d1' : ''}`}
            onClick={() => setPestanaActiva('notificaciones')}
          >
            Notificaciones
          </button>
        </div>

        {/* 1. Contenido Pestaña: General */}
        {pestanaActiva === 'general' && (
          <form onSubmit={handleGuardarGeneral} className="w3-container w3-padding-24">
            <h4>Información personal</h4>
            <div className="w3-section">
              <label>Nombre</label>
              <input 
                className="w3-input w3-border w3-round" 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="w3-section">
              <label>Correo electrónico</label>
              <input 
                className="w3-input w3-border w3-round" 
                type="email" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="w3-section">
              <label>Biografía</label>
              <textarea 
                className="w3-input w3-border w3-round" 
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <button type="submit" className="w3-button w3-theme-d2 w3-round">
              <i className="fa fa-save"></i> Guardar cambios
            </button>
          </form>
        )}

        {/* 2. Contenido Pestaña: Privacidad */}
        {pestanaActiva === 'privacidad' && (
          <form onSubmit={handleGuardarPrivacidad} className="w3-container w3-padding-24">
            <h4>Privacidad y seguridad</h4>
            <div className="w3-section">
              <label>¿Quién puede ver tu perfil?</label>
              <select 
                className="w3-select w3-border w3-round" 
                value={verPerfil}
                onChange={(e) => setVerPerfil(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Solo amigos">Solo amigos</option>
                <option value="Solo yo">Solo yo</option>
              </select>
            </div>
            <div className="w3-section">
              <label>¿Quién puede enviarte solicitudes de amistad?</label>
              <select 
                className="w3-select w3-border w3-round" 
                value={solicitudes}
                onChange={(e) => setSolicitudes(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Amigos de amigos">Amigos de amigos</option>
              </select>
            </div>
            <div className="w3-section">
              <label>Cambiar contraseña</label>
              <input 
                className="w3-input w3-border w3-round" 
                type="password" 
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w3-button w3-theme-d2 w3-round">
              <i className="fa fa-lock"></i> Actualizar privacidad
            </button>
          </form>
        )}

        {/* 3. Contenido Pestaña: Notificaciones */}
        {pestanaActiva === 'notificaciones' && (
          <form onSubmit={handleGuardarNotificaciones} className="w3-container w3-padding-24">
            <h4>Preferencias de notificaciones</h4>
            <div className="w3-section">
              <input 
                className="w3-check" 
                type="checkbox" 
                checked={notifCorreo}
                onChange={(e) => setNotifCorreo(e.target.checked)}
              /> 
              <label className="w3-margin-left">Recibir notificaciones por correo</label>
            </div>
            <div className="w3-section">
              <input 
                className="w3-check" 
                type="checkbox" 
                checked={notifMensajes}
                onChange={(e) => setNotifMensajes(e.target.checked)}
              /> 
              <label className="w3-margin-left">Notificaciones de nuevos mensajes</label>
            </div>
            <div className="w3-section">
              <input 
                className="w3-check" 
                type="checkbox" 
                checked={notifCumpleanos}
                onChange={(e) => setNotifCumpleanos(e.target.checked)}
              /> 
              <label className="w3-margin-left">Notificaciones de cumpleaños</label>
            </div>
            <div className="w3-section">
              <input 
                className="w3-check" 
                type="checkbox" 
                checked={notifGrupos}
                onChange={(e) => setNotifGrupos(e.target.checked)}
              /> 
              <label className="w3-margin-left">Notificaciones de grupos</label>
            </div>
            <button type="submit" className="w3-button w3-theme-d2 w3-round">
              <i className="fa fa-bell"></i> Guardar preferencias
            </button>
          </form>
        )}

      </div>
    </div>
  );
}