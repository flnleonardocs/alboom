// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dados from './components/Dados'; // Importe o componente Dados
import Sobre from './components/Sobre'; // Importe o componente Sobre

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
            <li>
              <Link to="/Dados">Dados</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dados />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/sobre" element={<Dados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
