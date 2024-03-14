import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Link to="/dados">Ir para Dados</Link><br />
      <Link to="/grafico">Ir para Gráfico</Link><br />
      <Link to="/sobre">Ir para Sobre</Link>
    </div>
  );
}

export default Home;