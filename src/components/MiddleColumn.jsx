import React, { useState } from 'react';
import Post from './Post';
import { useUser } from './UserContext';

export default function MiddleColumn() {
  const miUsuario = useUser();

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
      // Creamos una URL temporal para mostrar la imagen en el navegador
      setNuevaImagen(URL.createObjectURL(archivo));
    }
  };

  // Función para agregar el post a la lista
  const manejarPublicacion = () => {
    if (!nuevoTexto.trim() && !nuevaImagen) return; // No publicar si está vacío

    const nuevoPost = {
      id: crypto.randomUUID(), // El 4.5 de la rúbrica
      avatar: miUsuario.foto,
      time: "Justo ahora",
      name: miUsuario.nombre,
      text: nuevoTexto,
      image1: nuevaImagen, // Asignamos la imagen que subiste
      image2: null
    };

    // Agregamos el post arriba de la lista
    setPosts([nuevoPost, ...posts]);
    
    // Limpiamos los campos
    setNuevoTexto('');
    setNuevaImagen(null);
  };

  return (
    <div className="w3-col m7">
      
      {/* Caja para crear un nuevo post */}
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">¿Qué estás pensando?</h6>
              
              {/* Input de texto real */}
              <input 
                type="text"
                className="w3-input w3-border w3-margin-bottom"
                placeholder="Escribe tu estado aquí..."
                value={nuevoTexto}
                onChange={(e) => setNuevoTexto(e.target.value)}
              />
              
             {/* Input para subir foto y botón publicar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                {/* 1. Ocultamos el input real con display: 'none' y le damos un ID */}
                <input 
                  id="input-foto"
                  type="file" 
                  accept="image/*" 
                  onChange={handleSeleccionarImagen}
                  style={{ display: 'none' }} 
                />
                
                {/* 2. Creamos un label que actúe como botón (apunta al ID del input) */}
                <label htmlFor="input-foto" className="w3-button w3-theme-d1 w3-round">
                  <i className="fa fa-image"></i> {nuevaImagen ? 'Cambiar foto' : 'Subir foto'}
                </label>
                
                <button type="button" className="w3-button w3-theme w3-round" onClick={manejarPublicacion}>
                  <i className="fa fa-pencil"></i> Publicar
                </button> 
              </div>

              {/* Vista previa pequeña de la imagen si se seleccionó una */}
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
      
      {/* Recorremos el estado de posts y renderizamos el componente Post */}
      {posts.map((post) => (
        <Post 
          key={post.id}
          avatar={post.avatar}
          time={post.time}
          name={post.name}
          text={post.text}
          image1={post.image1}
          image2={post.image2}
        />
      ))}
      
    </div>
  );
}