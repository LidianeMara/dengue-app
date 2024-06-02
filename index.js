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
    const { geocode, ew_start, ey_start, ew_end, ey_end } = req.query;
    try {
        const response = await axios.get('https://info.dengue.mat.br/api/alertcity/', {
            params: {
                geocode,
                disease: 'dengue',
                format: 'json',
                ew_start,
                ey_start,
                ew_end,
                ey_end,
            },
        });
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
