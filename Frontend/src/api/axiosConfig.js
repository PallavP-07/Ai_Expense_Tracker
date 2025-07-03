import axios from 'axios';

const backendURL=import.meta.env.VITE_DEV_SERVER_URL
const api = axios.create({
    baseURL:`${backendURL}`,
    withCredentials:true
})
api.interceptors.request.use((config)=>{
    const token =localStorage.getItem('auth_token');
    if(token) config.headers.Authorization =` Bearer ${token}`;
    return config;
})

export default api;