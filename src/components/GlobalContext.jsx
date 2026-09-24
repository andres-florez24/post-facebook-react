import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Creamos el contexto con un nombre estándar
const GlobalContext = createContext();

// 2. Creamos el Provider (el componente que envuelve la app y guarda los datos)
export const GlobalProvider = ({ children }) => {
  // Inicializamos el estado intentando leer de localStorage con un nombre propio
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('mis_posts_react'); 
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return [
      {
        id: crypto.randomUUID(), // ID único garantizado (el 4.5 de la nota)
        user: 'John Doe',
        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
        time: '1 min',
        content: '¡Este es mi primer post en la red social con React y Context API!',
        images: ['https://www.w3schools.com/w3images/lights.jpg', 'https://www.w3schools.com/w3images/nature.jpg'],
        likes: 0,
        isLiked: false,
        comments: []
      }
    ];
  });

  // Guardamos en localStorage cada vez que el estado 'posts' cambie
  useEffect(() => {
    localStorage.setItem('mis_posts_react', JSON.stringify(posts));
  }, [posts]);

  // --- FUNCIONES QUE MODIFICAN EL ESTADO ---

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          isLiked: !post.isLiked, 
          likes: post.isLiked ? post.likes - 1 : post.likes + 1 
        };
      }
      return post;
    }));
  };

  const addPost = (text) => {
    if (!text.trim()) return;
    
    const newPost = {
      id: crypto.randomUUID(), 
      user: 'Andrés Esteban', // Tu nombre real para que el post salga a tu nombre
      avatar: 'https://www.w3schools.com/w3images/avatar3.png',
      time: 'Justo ahora',
      content: text,
      images: [],
      likes: 0,
      isLiked: false,
      comments: []
    };
    
    // Agregamos el nuevo post al inicio de la lista
    setPosts([newPost, ...posts]);
  };

  return (
    <GlobalContext.Provider value={{ posts, toggleLike, addPost }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 3. Hook personalizado para usarlo en otros componentes
export const useGlobalState = () => {
  return useContext(GlobalContext);
};