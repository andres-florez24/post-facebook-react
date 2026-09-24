import React, { useState } from 'react';

export default function Comment({ comentario, onResponder }) {
  // Estado exclusivo para abrir/cerrar la caja de respuesta de este comentario en particular
  const [mostrarCaja, setMostrarCaja] = useState(false);
  const [textoRespuesta, setTextoRespuesta] = useState('');

  const handleEnviar = () => {
    if (!textoRespuesta.trim()) return;
    
    // Llama a la función del Post pasándole el ID y el texto
    onResponder(comentario.id, textoRespuesta);
    
    setTextoRespuesta('');
    setMostrarCaja(false);
  };

  return (
    <div className="w3-panel w3-light-grey w3-round w3-padding" style={{ margin: '10px 0' }}>
      <p style={{ margin: '0 0 5px 0' }}><strong>{comentario.autor}:</strong> {comentario.texto}</p>
      
      <button 
        className="w3-button w3-small w3-text-theme w3-padding-small" 
        onClick={() => setMostrarCaja(!mostrarCaja)}
        style={{ background: 'transparent' }}
      >
        Responder
      </button>

      {/* Caja para responder (solo se muestra si se hizo clic en "Responder") */}
      {mostrarCaja && (
        <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
          <input 
            type="text" 
            className="w3-input w3-border w3-round w3-small" 
            placeholder="Escribe una respuesta..." 
            value={textoRespuesta}
            onChange={(e) => setTextoRespuesta(e.target.value)}
          />
          <button className="w3-button w3-theme-d2 w3-round w3-small" onClick={handleEnviar}>
            Enviar
          </button>
        </div>
      )}

      {/* Renderizado de las respuestas anidadas exclusivas de este comentario */}
      {comentario.respuestas.map((respuesta) => (
        <div key={respuesta.id} className="w3-panel w3-white w3-round w3-padding-small" style={{ margin: '5px 0 5px 20px', borderLeft: '3px solid #607d8b' }}>
          <p style={{ margin: '0' }}><strong>{respuesta.autor}:</strong> {respuesta.texto}</p>
        </div>
      ))}
    </div>
  );
}