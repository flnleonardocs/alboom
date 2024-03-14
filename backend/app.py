from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import pandas as pd

app = Flask(__name__)
CORS(app)

def conectar_bd():
    return mysql.connector.connect(
        host='127.0.0.1',
        port='3306',
        user='root',
        password='Data@2024',
        database='saascashteste'
    )

def executar_consulta(consulta):
    connection = conectar_bd()
    cursor = connection.cursor()
    cursor.execute(consulta)
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

@app.route('/dados')
def obter_dados():
    consulta = """
    SELECT 
        mes_ano,
        soma_valor,
        ROUND(variacao_mensal / LAG(soma_valor, 1, 0) OVER (ORDER BY mes_ano) * 100, 2) AS variacao_percentual
    FROM (
        SELECT 
            DATE_FORMAT(data, '%Y-%m') AS mes_ano,
            SUM(valor) AS soma_valor,
            SUM(valor) - LAG(SUM(valor), 1, 0) OVER (ORDER BY DATE_FORMAT(data, '%Y-%m')) AS variacao_mensal
        FROM 
            saascashteste.aboombrl
        GROUP BY 
            mes_ano
    ) AS subconsulta;
    """
    rows = executar_consulta(consulta)
    data = [{'Mes_Ano': row[0], 'Soma_Valor': row[1], 'Variacao_Percentual': row[2]} for row in rows]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
