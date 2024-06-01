import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/dengue-data',
    headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*',
        timeout: 1000,
    },
});