import axios from 'axios';

//referenced log Rocket: making network requests to my api

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type': 'application/json'
    },
    
});

export default api;