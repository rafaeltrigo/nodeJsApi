const express = require('express');
const axios = require('axios');
const path = require('path');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Configuração para conexão com o banco de dados PostgreSQL
const client = new Client({
  connectionString: 'postgres://cioqvwwh:yssBFLa23txoIr7AE9iwwLqT9JPe9T0B@tai.db.elephantsql.com/cioqvwwh',
});

// Conecta-se ao banco de dados PostgreSQL
client.connect();

// Define o diretório público para servir os arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal para obter os dados JSON da URL e salvá-los no banco de dados
app.get('/api/data', async (req, res) => {
    try {
        // Obter os dados da API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const postData = response.data;

        // Inserir os dados no banco de dados
        const query = 'INSERT INTO posts(title, body) VALUES($1, $2) RETURNING *';
        const values = [postData.title, postData.body];
        const result = await client.query(query, values);

        console.log('Dados inseridos:', result.rows[0]);

        // Retornar os dados inseridos como resposta
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao obter ou salvar os dados:', error.message);
        res.status(500).json({ error: 'Erro ao obter ou salvar os dados' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
