import axios from 'axios';

// URL do seu backend no Render
const api = axios.create({
  baseURL: 'https://crud-usuarios-p1cy.onrender.com',
});

export default api;
