import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Grafico() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dados, setDados] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/dados?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        setDados(response.data);

        const labels = response.data.map(item => item.Mes_Ano);
        const percentuais = response.data.map(item => item.Variacao_Percentual);

        if (chartInstance) {
          chartInstance.data.labels = labels;
          chartInstance.data.datasets[0].data = percentuais;
          chartInstance.update();
        } else {
          const ctx = document.getElementById('myChart');
          const newChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: 'Variação Percentual',
                data: percentuais,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(255, 255, 255)',
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Variação Percentual ao Longo do Tempo',
                  font: {
                    size: 18
                  }
                },
                legend: {
                  display: true,
                  labels: {
                    color: 'black',
                    boxWidth: 15,
                    font: {
                      size: 14
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Mês/Ano',
                    font: {
                      size: 16
                    }
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Variação Percentual',
                    font: {
                      size: 16
                    }
                  }
                }
              }
            }
          });
          setChartInstance(newChartInstance);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  const handleDateChange = () => {
    // Atualiza o gráfico quando as datas são alteradas
    setChartInstance(null);
  };

  return (
    <div>
      <h1>Gráfico</h1>
      <Link to="/">Voltar para Home</Link>
      <div style={{ marginBottom: '20px' }}>
        <label>De:</label>
        <DatePicker selected={startDate} onChange={date => { setStartDate(date); handleDateChange(); }} />
        <label>Até:</label>
        <DatePicker selected={endDate} onChange={date => { setEndDate(date); handleDateChange(); }} />
      </div>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default Grafico;
