import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { useUser } from './UserContext'; 

export default function Post({ avatar, time, name, text, image1, image2 }) {
  // --- CONTEXTO ---
  // Extraemos directamente usuarioActual del contexto (Requisito 3.5: useContext)
  const { usuarioActual } = useUser(); 

  // --- ESTADOS (Requisito 3.5: useState) ---
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [textoComentario, setTextoComentario] = useState(''); 

  // Inicializamos los comentarios intentando leer del localStorage
  const [comentarios, setComentarios] = useState(() => {
    const comentariosGuardados = localStorage.getItem(`comentarios_${name}`);
    return comentariosGuardados ? JSON.parse(comentariosGuardados) : [];
  }); 

  // --- EFECTOS (Requisito 3.5: useEffect) ---
  // Guardamos los comentarios en localStorage cada vez que haya un cambio
  useEffect(() => {
    localStorage.setItem(`comentarios_${name}`, JSON.stringify(comentarios));
  }, [comentarios, name]);

  // --- FUNCIONES (Requisito 5.0: Interactividad) ---
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShare = () => {
    alert("¡Enlace del post copiado para compartir!");
  };

  const agregarComentario = () => {
    if (!textoComentario.trim()) return;

    const nuevoComentario = {
      id: crypto.randomUUID(), // Requisito 4.5: Solución al error del ID
      autor: usuarioActual.nombre, // ¡CORREGIDO! Usamos tu nombre real del contexto
      texto: textoComentario,
      respuestas: [] 
    };

    setComentarios([...comentarios, nuevoComentario]);
    setTextoComentario(''); 
  };

  const agregarRespuesta = (idComentario, textoDeRespuesta) => {
    const comentariosActualizados = comentarios.map(comentario => {
      if (comentario.id === idComentario) {
        return {
          ...comentario,
          respuestas: [
            ...comentario.respuestas, 
            { 
              id: crypto.randomUUID(), // Requisito 4.5
              autor: usuarioActual.nombre, // ¡CORREGIDO! También para las respuestas
              texto: textoDeRespuesta 
            }
          ]
        };
      }
      return comentario;
    });

    setComentarios(comentariosActualizados);
  };

  // --- INTERFAZ (Requisito 4.0: Diseño idéntico al HTML) ---
  return (
    <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
      <img src={avatar} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
      <span className="w3-right w3-opacity">{time}</span>
      <h4>{name}</h4><br />
      <hr className="w3-clear" />
      
      <p>{text}</p>
      
      {/* Imágenes del Post si existen */}
      {(image1 || image2) && (
        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
          {image1 && <div className="w3-half"><img src={image1} style={{ width: '100%' }} alt="Imagen 1" className="w3-margin-bottom" /></div>}
          {image2 && <div className="w3-half"><img src={image2} style={{ width: '100%' }} alt="Imagen 2" className="w3-margin-bottom" /></div>}
        </div>
      )}

      {/* Botones de Acción */}
      <button type="button" className={`w3-button w3-margin-bottom ${isLiked ? 'w3-theme-d4' : 'w3-theme-d1'}`} onClick={handleLike}>
        <i className="fa fa-thumbs-up"></i> {isLiked ? 'Ya no me gusta' : 'Me gusta'} {likes > 0 ? `(${likes})` : ''}
      </button> 
      
      <button type="button" className="w3-button w3-theme-l4 w3-margin-bottom w3-right" onClick={handleShare}>
        <i className="fa fa-share"></i> Compartir
      </button> 

      <hr className="w3-clear" style={{ margin: '10px 0' }}/>

      {/* --- SECCIÓN DE COMENTARIOS --- */}
      <div className="w3-padding-small">
        
        {/* Caja de texto principal */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input 
            type="text" 
            className="w3-input w3-border w3-round" 
            placeholder="Escribe un comentario..." 
            value={textoComentario}
            onChange={(e) => setTextoComentario(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarComentario()} 
          />
          <button className="w3-button w3-theme-d1 w3-round" onClick={agregarComentario}>Comentar</button>
        </div>

        {/* Lista de comentarios modularizada */}
        {comentarios.map((comentario) => (
          <Comment 
            key={comentario.id} 
            comentario={comentario} 
            onResponder={agregarRespuesta} 
          />
        ))}
        
      </div>
    </div>
  );
}