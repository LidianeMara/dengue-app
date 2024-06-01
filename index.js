// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8000;

// Configuração do CORS
app.use(cors());

// Rota para obter dados da API da dengue
app.get('/api/dengue-data', async (req, res) => {
    try {
        const response = await axios.get('https://info.dengue.mat.br/api/alertcity/', {
            params: {
                geocode: '3304557',
                disease: 'dengue',
                format: 'json',
                ew_start: 1,
                ey_start: 2021,
                ew_end: 53,
                ey_end: 2021,
            },
        });
        console.log(response)
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
