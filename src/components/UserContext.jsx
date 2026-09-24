import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Ponemos tu información real para que se refleje en toda la app
  const usuarioActual = {
    nombre: "Andrés Esteban Flórez Palacio",
    foto: "https://www.w3schools.com/w3images/avatar3.png", 
    profesion: "Estudiante Técnico Laboral, CESDE",
    ubicacion: "Medellín, Colombia",
    cumpleanos: "Mayo 24, 1994"
  };

  return (
    <UserContext.Provider value={usuarioActual}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};