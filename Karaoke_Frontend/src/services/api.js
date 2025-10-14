import axios from "axios";

const api = axios.create({
	baseURL: 'https://karaokemax.onrender.com'
	// baseURL: 'http://localhost:3000'
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
		config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
		localStorage.removeItem('token');
		window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

export default api;
