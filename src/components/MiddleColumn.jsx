import React, { useState } from 'react';
import Post from './Post';
import { useUser } from './UserContext';

export default function MiddleColumn() {
  const { usuarioActual } = useUser(); // Extraemos directamente al usuario actual

  // 1. Estado para los posts (iniciamos con los 3 de la plantilla original)
  const [posts, setPosts] = useState([
    {
      id: crypto.randomUUID(),
      avatar: "https://www.w3schools.com/w3images/avatar2.png",
      time: "1 min",
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image1: "https://www.w3schools.com/w3images/lights.jpg",
      image2: "https://www.w3schools.com/w3images/nature.jpg"
    },
    {
      id: crypto.randomUUID(),
      avatar: "https://www.w3schools.com/w3images/avatar5.png",
      time: "16 min",
      name: "Jane Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image1: null,
      image2: null
    },
    {
      id: crypto.randomUUID(),
      avatar: "https://www.w3schools.com/w3images/avatar6.png",
      time: "32 min",
      name: "Angie Jane",
      text: "Have you seen this? Lorem ipsum dolor sit amet...",
      image1: "https://www.w3schools.com/w3images/nature.jpg",
      image2: null
    }
  ]);

  // 2. Estados para el nuevo post
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(null);

  // Función para procesar la imagen seleccionada desde el PC
  const handleSeleccionarImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setNuevaImagen(URL.createObjectURL(archivo));
    }
  };

  // Función para agregar el post a la lista
  const manejarPublicacion = () => {
    if (!nuevoTexto.trim() && !nuevaImagen) return;

    const nuevoPost = {
      id: crypto.randomUUID(),
      avatar: usuarioActual.foto, // Usamos la foto del usuario logueado
      time: "Justo ahora",
      name: usuarioActual.nombre, // Usamos el nombre real
      text: nuevoTexto,
      image1: nuevaImagen, 
      image2: null
    };

    setPosts([nuevoPost, ...posts]);
    
    setNuevoTexto('');
    setNuevaImagen(null);
  };

  return (
    <div className="w3-col m7">
      
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">¿Qué estás pensando, {usuarioActual.nombre.split(' ')[0]}?</h6>
              
              <input 
                type="text"
                className="w3-input w3-border w3-margin-bottom"
                placeholder="Escribe tu estado aquí..."
                value={nuevoTexto}
                onChange={(e) => setNuevoTexto(e.target.value)}
              />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <input 
                  id="input-foto"
                  type="file" 
                  accept="image/*" 
                  onChange={handleSeleccionarImagen}
                  style={{ display: 'none' }} 
                />
                
                <label htmlFor="input-foto" className="w3-button w3-theme-d1 w3-round">
                  <i className="fa fa-image"></i> {nuevaImagen ? 'Cambiar foto' : 'Subir foto'}
                </label>
                
                <button type="button" className="w3-button w3-theme w3-round" onClick={manejarPublicacion}>
                  <i className="fa fa-pencil"></i> Publicar
                </button> 
              </div>

              {nuevaImagen && (
                <div className="w3-margin-top">
                  <span className="w3-opacity w3-small">Vista previa:</span><br/>
                  <img src={nuevaImagen} alt="preview" style={{ height: '60px', borderRadius: '4px' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {posts.map((post) => (
        <Post 
          key={post.id}
          avatar={post.avatar}
          time={post.time}
          name={post.name}
          text={post.text}
          image1={post.image1}
          image2={post.image2}
          usuarioLogueado={usuarioActual} // Le enviamos el usuario actual al archivo Post.jsx
        />
      ))}
      
    </div>
  );
}