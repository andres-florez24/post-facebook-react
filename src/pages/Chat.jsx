import React, { useState } from 'react';

export default function Chat() {
  // 1. Cada contacto tiene su información y su propia lista de mensajes
  const [conversaciones, setConversaciones] = useState({
    jane: {
      id: 'jane',
      nombre: 'Jane Doe',
      avatar: 'https://www.w3schools.com/w3images/avatar5.png',
      estado: 'Activa ahora',
      ultimoMensaje: 'Hola, ¿cómo estás?',
      hora: '10:30',
      mensajes: [
        { id: 1, remitente: 'Jane Doe', texto: '¡Hola! ¿Cómo va el diseño?', hora: '10:28', esMio: false },
        { id: 2, remitente: 'Tú', texto: 'Muy bien, casi terminado. ¿Te gustó la última versión?', hora: '10:30', esMio: true },
        { id: 3, remitente: 'Jane Doe', texto: 'Sí, está genial. Solo unos ajustes en los colores.', hora: '10:32', esMio: false }
      ]
    },
    angie: {
      id: 'angie',
      nombre: 'Angie Jane',
      avatar: 'https://www.w3schools.com/w3images/avatar6.png',
      estado: 'Desconectada',
      ultimoMensaje: '¿Viste el nuevo proyecto?',
      hora: 'Ayer',
      mensajes: [
        { id: 1, remitente: 'Angie Jane', texto: '¿Viste el nuevo proyecto que subió el profesor?', hora: 'Ayer 15:40', esMio: false },
        { id: 2, remitente: 'Tú', texto: 'Sí, ya lo estoy revisando en React.', hora: 'Ayer 16:00', esMio: true }
      ]
    },
    john: {
      id: 'john',
      nombre: 'John Doe',
      avatar: 'https://www.w3schools.com/w3images/avatar2.png',
      estado: 'En línea',
      ultimoMensaje: '¡Claro! Quedó genial.',
      hora: 'Ayer',
      mensajes: [
        { id: 1, remitente: 'John Doe', texto: '¡Hola! ¿Probaste el botón de likes?', hora: 'Ayer 09:15', esMio: false },
        { id: 2, remitente: 'Tú', texto: '¡Claro! Quedó genial.', hora: 'Ayer 09:20', esMio: true }
      ]
    }
  });

  // 2. Estado que recuerda cuál contacto tenemos seleccionado (empieza con Jane)
  const [contactoActivoId, setContactoActivoId] = useState('jane');

  // 3. Estado para lo que escribes en la caja de texto
  const [nuevoTexto, setNuevoTexto] = useState('');

  // Obtenemos los datos del chat que está abierto en este momento
  const chatActual = conversaciones[contactoActivoId];

  // 4. Función para enviar un nuevo mensaje al chat que esté seleccionado
  const handleEnviarMensaje = (e) => {
    e.preventDefault();
    if (!nuevoTexto.trim()) return;

    const mensajeNuevo = {
      id: crypto.randomUUID(),
      remitente: 'Tú',
      texto: nuevoTexto,
      hora: 'Justo ahora',
      esMio: true
    };

    // Agregamos el mensaje SOLO a la conversación que tenemos abierta
    setConversaciones({
      ...conversaciones,
      [contactoActivoId]: {
        ...chatActual,
        mensajes: [...chatActual.mensajes, mensajeNuevo],
        ultimoMensaje: nuevoTexto,
        hora: 'Justo ahora'
      }
    });

    setNuevoTexto('');
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1200px', marginTop: '80px' }}>
      <div className="w3-row">
        
        {/* Columna Izquierda: Lista de conversaciones */}
        <div className="w3-col m4">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h4><i className="fa fa-comments"></i> Conversaciones</h4>
              <div className="w3-section">
                <input className="w3-input w3-border w3-round" type="text" placeholder="Buscar mensajes..." />
              </div>
            </div>
            
            <ul className="w3-ul w3-hoverable">
              {Object.values(conversaciones).map((contacto) => (
                <li 
                  key={contacto.id} 
                  className={`w3-padding-16 ${contactoActivoId === contacto.id ? 'w3-theme-l4' : ''}`}
                  onClick={() => setContactoActivoId(contacto.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={contacto.avatar} className="w3-left w3-circle w3-margin-right" style={{ width: '50px' }} alt={contacto.nombre} />
                  <span className="w3-large">{contacto.nombre}</span><br />
                  <span className="w3-opacity">{contacto.ultimoMensaje}</span>
                  <span className="w3-right w3-small w3-text-theme">{contacto.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Ventana del chat seleccionado */}
        <div className="w3-col m8">
          <div className="w3-card w3-round w3-white">
            
            {/* Cabecera del chat (cambia de foto y nombre según a quién le diste clic) */}
            <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-large">
              <h4>
                <img src={chatActual.avatar} className="w3-circle" style={{ width: '40px', verticalAlign: 'middle' }} alt={chatActual.nombre} /> {chatActual.nombre} 
                <span className="w3-opacity w3-medium"> · {chatActual.estado}</span>
              </h4>
            </div>

            {/* Lista de mensajes del chat seleccionado */}
            <div className="w3-container w3-padding-16" style={{ height: '400px', overflowY: 'scroll' }}>
              {chatActual.mensajes.map((m) => (
                <div 
                  key={m.id} 
                  className={`w3-panel w3-round-large ${m.esMio ? 'w3-rightbar w3-border-green w3-theme-l4 w3-right' : 'w3-leftbar w3-border-blue w3-theme-l5'}`}
                  style={{ maxWidth: '80%', clear: 'both' }}
                >
                  <p><strong>{m.remitente}</strong> <span className="w3-opacity">{m.hora}</span></p>
                  <p>{m.texto}</p>
                </div>
              ))}
            </div>

            {/* Formulario para escribir y enviar */}
            <form onSubmit={handleEnviarMensaje} className="w3-container w3-padding-16 w3-border-top">
              <div className="w3-row">
                <div className="w3-col s9">
                  <input 
                    className="w3-input w3-border w3-round" 
                    type="text" 
                    placeholder={`Escribir a ${chatActual.nombre}...`}
                    value={nuevoTexto}
                    onChange={(e) => setNuevoTexto(e.target.value)}
                  />
                </div>
                <div className="w3-col s3">
                  <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block">
                    <i className="fa fa-paper-plane"></i> Enviar
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}