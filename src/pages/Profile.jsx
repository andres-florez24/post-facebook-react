import React, { useState } from 'react';
import { useUser } from '../components/UserContext';

export default function Profile() {
  const { usuarioActual: miUsuario } = useUser();

  // 1. Estado para las publicaciones del perfil
  const [misPosts, setMisPosts] = useState([
    {
      id: 1,
      autor: miUsuario.nombre,
      avatar: miUsuario.foto,
      tiempo: 'Hace 2 horas',
      texto: '¡Nuevo diseño de interfaz terminado! 🎨 ¿Qué opinan?',
      imagen: 'https://www.w3schools.com/w3images/nature.jpg',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      autor: miUsuario.nombre,
      avatar: miUsuario.foto,
      tiempo: 'Ayer',
      texto: 'Feliz de anunciar que me uniré al equipo de diseño de W3Schools como colaborador. 🚀',
      imagen: null,
      likes: 5,
      isLiked: false
    }
  ]);

  // 2. Estado para escribir un nuevo post en el perfil
  const [nuevoPostTexto, setNuevoPostTexto] = useState('');

  // Dar like a un post del perfil
  const handleLike = (idPost) => {
    setMisPosts(misPosts.map(post => {
      if (post.id === idPost) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Agregar nueva publicación en el perfil
  const handlePublicar = () => {
    if (!nuevoPostTexto.trim()) return;

    const nuevo = {
      id: crypto.randomUUID(),
      autor: miUsuario.nombre,
      avatar: miUsuario.foto,
      tiempo: 'Justo ahora',
      texto: nuevoPostTexto,
      imagen: null,
      likes: 0,
      isLiked: false
    };

    setMisPosts([nuevo, ...misPosts]);
    setNuevoPostTexto('');
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px', marginBottom: '40px' }}>
      <div className="w3-row">
        
        {/* Columna izquierda: info de perfil */}
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
              <h4 className="w3-center">Mi perfil</h4>
              <p className="w3-center">
                <img src={miUsuario.foto} className="w3-circle" style={{ height: '106px', width: '106px' }} alt="Avatar" />
              </p>
              <hr />
              <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> {miUsuario.profesion}</p>
              <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> {miUsuario.ubicacion}</p>
              <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> {miUsuario.cumpleanos}</p>
              <p><i className="fa fa-users fa-fw w3-margin-right w3-text-theme"></i> 1.2k seguidores · 345 siguiendo</p>
              <button type="button" className="w3-button w3-block w3-theme-d2 w3-margin-bottom" onClick={() => alert('Función de editar perfil')}>
                <i className="fa fa-pencil"></i> Editar perfil
              </button>
            </div>
          </div>
          <br />

          {/* Fotos destacadas */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16">
              <p><i className="fa fa-camera"></i> Fotos</p>
              <div className="w3-row-padding">
                <div className="w3-third"><img src="https://www.w3schools.com/w3images/lights.jpg" style={{ width: '100%' }} className="w3-margin-bottom" alt="foto1" /></div>
                <div className="w3-third"><img src="https://www.w3schools.com/w3images/nature.jpg" style={{ width: '100%' }} className="w3-margin-bottom" alt="foto2" /></div>
                <div className="w3-third"><img src="https://www.w3schools.com/w3images/mountains.jpg" style={{ width: '100%' }} className="w3-margin-bottom" alt="foto3" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna central: portada, publicar y publicaciones */}
        <div className="w3-col m7">
          
          {/* Portada */}
          <div className="w3-card w3-round w3-white w3-margin-bottom" style={{ marginLeft: '16px', marginRight: '16px' }}>
            <img src="https://www.w3schools.com/w3images/forest.jpg" alt="Portada" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
            <div className="w3-container w3-padding">
              <h3>{miUsuario.nombre} <span className="w3-opacity w3-medium">@andresflorez</span></h3>
              <p>Desarrollador y estudiante. Apasionado por la tecnología y la programación.</p>
            </div>
          </div>

          {/* Publicar estado */}
          <div className="w3-card w3-round w3-white w3-margin-bottom" style={{ marginLeft: '16px', marginRight: '16px' }}>
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">¿Qué estás pensando?</h6>
              <input 
                type="text" 
                className="w3-input w3-border w3-margin-bottom" 
                placeholder="Comparte algo en tu perfil..."
                value={nuevoPostTexto}
                onChange={(e) => setNuevoPostTexto(e.target.value)}
              />
              <button type="button" className="w3-button w3-theme w3-round" onClick={handlePublicar}>
                <i className="fa fa-pencil"></i> Publicar
              </button>
            </div>
          </div>

          {/* Lista de Publicaciones */}
          {misPosts.map((post) => (
            <div key={post.id} className="w3-container w3-card w3-white w3-round w3-margin">
              <br />
              <img src={post.avatar} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
              <span className="w3-right w3-opacity">{post.tiempo}</span>
              <h4>{post.autor}</h4><br />
              <hr className="w3-clear" />
              
              <p>{post.texto}</p>
              
              {post.imagen && (
                <img src={post.imagen} style={{ width: '100%' }} className="w3-margin-bottom" alt="post img" />
              )}
              
              <button 
                type="button" 
                className={`w3-button w3-margin-bottom ${post.isLiked ? 'w3-theme-d4' : 'w3-theme-d1'}`}
                onClick={() => handleLike(post.id)}
              >
                <i className="fa fa-thumbs-up"></i> {post.isLiked ? `Te gusta (${post.likes})` : `Me gusta (${post.likes})`}
              </button>
            </div>
          ))}

        </div>

        {/* Columna derecha: eventos y publicidad */}
        <div className="w3-col m2">
          <div className="w3-card w3-round w3-white w3-center w3-padding-16">
            <p><i className="fa fa-calendar"></i> Próximos eventos</p>
            <p><strong>Reunión de diseño</strong><br />Viernes 15:00</p>
            <button type="button" className="w3-button w3-block w3-theme-l4">Info</button>
          </div>
          <br />
          <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
            <p>ADS</p>
          </div>
        </div>

      </div>
    </div>
  );
}