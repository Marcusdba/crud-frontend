import axios from 'axios';

// URL do seu backend no Render
const api = axios.create({
  baseURL: "https://crud-usuarios-p1cy.onrender.com", // seu backend no Render
});

export default api;
