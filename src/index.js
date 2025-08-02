require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configuração de CORS para permitir localhost e Vercel
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://crud-frontend-l07kxcngi-marcus-projects-299c5af7.vercel.app" // coloque aqui a URL exata do seu frontend no Vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Porta e conexão Mongo
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Rotas principais
app.use('/usuarios', userRoutes);

// Conexão com MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas!');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  });
