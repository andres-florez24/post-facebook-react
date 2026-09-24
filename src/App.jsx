import React from 'react';
import Navbar from './components/Navbar';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import MiddleColumn from './components/MiddleColumn';

function App() {
  return (
    <div className="w3-theme-l5">
      <Navbar />

      <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
        <div className="w3-row">
          
          <LeftColumn />
          <MiddleColumn />
          <RightColumn />

        </div>
      </div>
      <br />
    </div>
  );
}

export default App;