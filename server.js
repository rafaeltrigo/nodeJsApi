// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Define o diretório público para servir os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para obter os dados JSON da URL
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        res.json(response.data);
        console.log(response.data)
    } catch (error) {
        console.error('Erro ao obter os dados:', error.message);
        res.status(500).json({ error: 'Erro ao obter os dados' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
