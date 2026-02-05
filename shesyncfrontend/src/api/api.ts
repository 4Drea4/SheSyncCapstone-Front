import axios from 'axios';

//referenced log Rocket: making network requests to my api

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type': 'application/json'
    },
    
});
//axios site

    api.interceptors.request.use((config)=> {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })

export default api;