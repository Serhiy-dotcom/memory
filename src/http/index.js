import axios from 'axios';

export const API_URL = 'https://memory-backend-dbu6.onrender.com';

export const $api = axios.create({
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	config.headers['x-auth-token'] = localStorage.getItem('x-auth-token');

	return config;
});
