import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom

function Dados() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/dados');
        setDados(response.data);

        const labels = response.data.map(item => item.Mes_Ano);
        const percentuais = response.data.map(item => item.Variacao_Percentual);

        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Variação Percentual',
              data: percentuais,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dados do MySQL</h1>
      <Link to="/">Voltar para Home</Link> {/* Mova o Link para a página inicial para logo após o elemento <h1> */}
      <canvas id="myChart" width="400" height="200"></canvas>
      <table>
        <thead>
          <tr>
            <th>Mês/Ano</th>
            <th>Soma Valor</th>
            <th>Variação Percentual</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.Mes_Ano}</td>
              <td>{item.Soma_Valor}</td>
              <td>{item.Variacao_Percentual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dados;
