import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Contextos
import { UserProvider } from './components/UserContext';
import { GlobalProvider } from './components/GlobalContext';

// Componentes estructurales
import Navbar from './components/Navbar';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import MiddleColumn from './components/MiddleColumn';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Vista de inicio
function Home() {
  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
      <div className="w3-row">
        <LeftColumn />
        <MiddleColumn />
        <RightColumn />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <GlobalProvider>
        <HashRouter>
          <div className="w3-theme-l5" style={{ minHeight: '100vh' }}>
            <Navbar />

            <Routes>
              {/* --- Rutas Públicas (Libres para acceder) --- */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />

              {/* --- Rutas Restringidas (Nota 5.0) --- */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />

              <Route path="/perfil" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/mensajes" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />

              <Route path="/grupos" element={
                <ProtectedRoute>
                  <Groups />
                </ProtectedRoute>
              } />

              <Route path="/configuracion" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </HashRouter>
      </GlobalProvider>
    </UserProvider>
  );
}