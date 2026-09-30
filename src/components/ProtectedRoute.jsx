import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

// Este componente envuelve cualquier página que queramos restringir
export default function ProtectedRoute({ children }) {
  const { autenticado } = useUser();

  // Si no ha iniciado sesión, el Navigate lo expulsa hacia el login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, lo deja ver el contenido (children)
  return children;
}