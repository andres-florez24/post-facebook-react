import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(() => {
    const guardados = localStorage.getItem('db_usuarios');
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      return [
        {
          nombre: "Andrés Esteban",
          correo: "admin@redsocial.com",
          password: "admin",
          fechaNacimiento: "1994-05-24",
          genero: "Hombre",
          foto: "https://www.w3schools.com/w3images/avatar3.png",
          ubicacion: "Medellín, Colombia",
          profesion: "Desarrollador Frontend",
          preguntaSeguridad: "¿En qué ciudad se conocieron tus padres?",
          respuestaSeguridad: "medellin" 
        },
        {
          nombre: "Ana María Gómez",
          correo: "ana@test.com",
          password: "123",
          fechaNacimiento: "1996-08-15",
          genero: "Mujer",
          foto: "https://www.w3schools.com/w3images/avatar6.png",
          ubicacion: "Bogotá, Colombia",
          profesion: "Diseñadora UX",
          preguntaSeguridad: "¿Cuál fue el nombre de tu primer jefe?",
          respuestaSeguridad: "carlos"
        },
        {
          nombre: "Carlos Ruiz",
          correo: "carlos@test.com",
          password: "abc",
          fechaNacimiento: "1990-11-02",
          genero: "Hombre",
          foto: "https://www.w3schools.com/w3images/avatar2.png",
          ubicacion: "Cali, Colombia",
          profesion: "Ingeniero de Datos",
          preguntaSeguridad: "¿Cuál era el nombre de tu profesor favorito en la escuela primaria?",
          respuestaSeguridad: "marta"
        }
      ];
    }
  });

  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem('sesion_iniciada') === 'true';
  });

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const activo = localStorage.getItem('usuario_activo');
    return activo ? JSON.parse(activo) : {
      nombre: "Invitado",
      foto: "https://www.w3schools.com/w3images/avatar2.png",
      profesion: "Desconocida",
      ubicacion: "Desconocida",
      cumpleanos: "Desconocido"
    };
  });

  useEffect(() => {
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosRegistrados));
  }, [usuariosRegistrados]);

  useEffect(() => {
    localStorage.setItem('sesion_iniciada', autenticado);
    localStorage.setItem('usuario_activo', JSON.stringify(usuarioActual));
  }, [autenticado, usuarioActual]);

  const registrarUsuario = (nuevoUsuario) => {
    const correoExiste = usuariosRegistrados.find(user => user.correo === nuevoUsuario.correo);
    if (correoExiste) return false;

    const usuarioCompleto = {
      ...nuevoUsuario,
      foto: nuevoUsuario.foto ? nuevoUsuario.foto : "https://www.w3schools.com/w3images/avatar3.png",
      profesion: "Nuevo Estudiante",
      ubicacion: "Medellín, Colombia",
      cumpleanos: nuevoUsuario.fechaNacimiento
    };

    setUsuariosRegistrados([...usuariosRegistrados, usuarioCompleto]);
    setUsuarioActual(usuarioCompleto);
    setAutenticado(true);
    return true;
  };

  const login = (correoIngresado, passwordIngresado) => {
    const usuarioValido = usuariosRegistrados.find(
      user => user.correo === correoIngresado && user.password === passwordIngresado
    );

    if (usuarioValido) {
      setUsuarioActual(usuarioValido);
      setAutenticado(true);
      return true;
    } else {
      return false; 
    }
  };

  const logout = () => {
    setAutenticado(false);
  };

  const obtenerPreguntaSeguridad = (correoBuscado) => {
    const usuarioEncontrado = usuariosRegistrados.find(user => user.correo === correoBuscado);
    return usuarioEncontrado ? usuarioEncontrado.preguntaSeguridad : null;
  };

  const recuperarPassword = (correoBuscado, respuestaIngresada) => {
    const usuarioEncontrado = usuariosRegistrados.find(user => user.correo === correoBuscado);
    if (usuarioEncontrado && usuarioEncontrado.respuestaSeguridad.toLowerCase() === respuestaIngresada.toLowerCase().trim()) {
      return usuarioEncontrado.password;
    }
    return null; 
  };

  return (
    <UserContext.Provider value={{ usuarioActual, autenticado, login, logout, registrarUsuario, obtenerPreguntaSeguridad, recuperarPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);