import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 1. "Base de datos" de cuentas guardadas en localStorage
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(() => {
    const guardados = localStorage.getItem('db_usuarios');
    return guardados ? JSON.parse(guardados) : [];
  });

  // 2. Estado de la sesión actual
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

  // 3. Guardar cambios en la memoria del navegador automáticamente
  useEffect(() => {
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosRegistrados));
  }, [usuariosRegistrados]);

  useEffect(() => {
    localStorage.setItem('sesion_iniciada', autenticado);
    localStorage.setItem('usuario_activo', JSON.stringify(usuarioActual));
  }, [autenticado, usuarioActual]);

  // --- FUNCIÓN DE REGISTRO REAL ---
  const registrarUsuario = (nuevoUsuario) => {
    // Verificamos si el correo ya existe para no duplicar cuentas
    const correoExiste = usuariosRegistrados.find(user => user.correo === nuevoUsuario.correo);
    if (correoExiste) return false;

    const usuarioCompleto = {
      ...nuevoUsuario,
      foto: "https://www.w3schools.com/w3images/avatar3.png",
      profesion: "Nuevo Estudiante",
      ubicacion: "Medellín, Colombia",
      cumpleanos: nuevoUsuario.fechaNacimiento
    };

    setUsuariosRegistrados([...usuariosRegistrados, usuarioCompleto]);
    setUsuarioActual(usuarioCompleto);
    setAutenticado(true);
    return true;
  };

  // --- FUNCIÓN DE LOGIN REAL (Adiós al error fatal) ---
  const login = (correoIngresado, passwordIngresado) => {
    // Buscamos a alguien que coincida EXACTAMENTE en correo y contraseña
    const usuarioValido = usuariosRegistrados.find(
      user => user.correo === correoIngresado && user.password === passwordIngresado
    );

    if (usuarioValido) {
      setUsuarioActual(usuarioValido);
      setAutenticado(true);
      return true; // Credenciales correctas
    } else {
      return false; // Credenciales incorrectas
    }
  };

  const logout = () => {
    setAutenticado(false);
  };

  return (
    <UserContext.Provider value={{ usuarioActual, autenticado, login, logout, registrarUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);