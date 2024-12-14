
const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
const path = require('path');


const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/userRoutes'); // Importando as rotas de usuários
const favoriteRoutes = require('./routes/favorites'); // Importa as rotas de favoritos
const reservationRoutes = require('./routes/reservationRoutes'); // Rotas de reservas


dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Usar as rotas de livros
app.use('/api', bookRoutes);

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

// Usar as rotas de autenticação
app.use('/api/user', authRoutes);

// Usar as rotas de autenticação do perfil
app.use('/api/user/profile', authRoutes);

// Usar as rotas de usuários
app.use('/api/users', userRoutes);

app.use('/api', reservationRoutes);

// Usar as rotas de favoritos
app.use('/api/favorites', favoriteRoutes);




// Conexão com o mongo db

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,useUnifiedTopology:true
}
   
    
    
).then(()=>console.log('Mongodb conectado')).catch(err=>console.error('Erro ao conectar no mongo',err));

const PORT = process.env.PORT || 5000; //Define a parte do servidor, usando variavel de ambiente ou padrão 5000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//Midleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
