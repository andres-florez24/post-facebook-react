import React, { useState } from 'react';

export default function Groups() {
  // 1. Memoria para la lista de "Mis grupos"
  const [misGrupos, setMisGrupos] = useState([
    {
      id: 1,
      nombre: 'Diseñadores UI/UX',
      avatar: 'https://www.w3schools.com/w3images/avatar2.png',
      detalle: '1.2k miembros · 15 publicaciones nuevas'
    },
    {
      id: 2,
      nombre: 'Desarrollo Web',
      avatar: 'https://www.w3schools.com/w3images/avatar5.png',
      detalle: '3.4k miembros · 8 publicaciones nuevas'
    },
    {
      id: 3,
      nombre: 'Fotografía Creativa',
      avatar: 'https://www.w3schools.com/w3images/avatar6.png',
      detalle: '856 miembros · 3 publicaciones nuevas'
    }
  ]);

  // 2. Memoria para los grupos sugeridos
  const [sugeridos, setSugeridos] = useState([
    {
      id: 101,
      nombre: 'Viajeros del mundo',
      avatar: 'https://www.w3schools.com/w3images/forest.jpg',
      detalle: '5.1k miembros'
    },
    {
      id: 102,
      nombre: 'Tecnología y gadgets',
      avatar: 'https://www.w3schools.com/w3images/lights.jpg',
      detalle: '8.2k miembros'
    },
    {
      id: 103,
      nombre: 'Cocina fácil',
      avatar: 'https://www.w3schools.com/w3images/nature.jpg',
      detalle: '2.7k miembros'
    }
  ]);

  // 3. Memoria para el buscador
  const [busqueda, setBusqueda] = useState('');

  // Función al hacer clic en "Unirse"
  const handleUnirse = (grupoSeleccionado) => {
    // Lo agregamos a "Mis grupos"
    setMisGrupos([...misGrupos, { ...grupoSeleccionado, detalle: `${grupoSeleccionado.detalle} · Te uniste recientemente` }]);
    
    // Lo quitamos de la lista de sugeridos
    setSugeridos(sugeridos.filter(g => g.id !== grupoSeleccionado.id));
  };

  // Función al hacer clic en "Crear nuevo grupo"
  const handleCrearGrupo = () => {
    const nombreGrupo = prompt('Escribe el nombre del nuevo grupo:');
    if (!nombreGrupo || !nombreGrupo.trim()) return;

    const nuevo = {
      id: crypto.randomUUID(),
      nombre: nombreGrupo,
      avatar: 'https://www.w3schools.com/w3images/avatar3.png',
      detalle: '1 miembro · Creado por ti'
    };

    setMisGrupos([nuevo, ...misGrupos]);
  };

  // Filtramos la lista de sugeridos según lo que se escriba en el buscador
  const sugeridosFiltrados = sugeridos.filter(g => 
    g.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1200px', marginTop: '80px', marginBottom: '40px' }}>
      <div className="w3-row-padding">
        
        {/* Columna izquierda: Mis grupos */}
        <div className="w3-col m6">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h3><i className="fa fa-group"></i> Mis grupos ({misGrupos.length})</h3>
            </div>
            
            <ul className="w3-ul">
              {misGrupos.map((grupo) => (
                <li key={grupo.id} className="w3-padding-16">
                  <img src={grupo.avatar} className="w3-left w3-circle w3-margin-right" style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt={grupo.nombre} />
                  <span className="w3-large">{grupo.nombre}</span><br />
                  <span className="w3-opacity">{grupo.detalle}</span>
                  <button type="button" className="w3-button w3-small w3-theme-d2 w3-right w3-round">
                    Ver grupo
                  </button>
                </li>
              ))}
            </ul>

            <div className="w3-container w3-padding-16">
              <button type="button" className="w3-button w3-block w3-theme-l1" onClick={handleCrearGrupo}>
                <i className="fa fa-plus"></i> Crear nuevo grupo
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha: Grupos sugeridos */}
        <div className="w3-col m6">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d1">
              <h3><i className="fa fa-star"></i> Grupos sugeridos</h3>
            </div>
            
            <ul className="w3-ul">
              {sugeridosFiltrados.length === 0 ? (
                <li className="w3-padding-16 w3-center w3-opacity">No hay grupos para mostrar</li>
              ) : (
                sugeridosFiltrados.map((grupo) => (
                  <li key={grupo.id} className="w3-padding-16">
                    <img src={grupo.avatar} className="w3-left w3-circle w3-margin-right" style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt={grupo.nombre} />
                    <span className="w3-large">{grupo.nombre}</span><br />
                    <span className="w3-opacity">{grupo.detalle}</span>
                    <button 
                      type="button" 
                      className="w3-button w3-small w3-green w3-right w3-round"
                      onClick={() => handleUnirse(grupo)}
                    >
                      <i className="fa fa-plus"></i> Unirse
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
          
          <br />

          {/* Caja para buscar grupos */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16">
              <h4>Buscar grupos</h4>
              <input 
                className="w3-input w3-border w3-round" 
                type="text" 
                placeholder="Nombre del grupo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}