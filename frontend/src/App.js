import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importe o componente Routes
import Home from './pages/Home';
import Dados from './components/Dados';
import Grafico from './pages/Grafico';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Router>
      <Routes> {/* Envolver os componentes Route dentro do componente Routes */}
        <Route path="/" element={<Home />} /> {/* Usar 'element' para especificar o componente */}
        <Route path="/dados" element={<Dados />} />
        <Route path="/grafico" element={<Grafico />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;