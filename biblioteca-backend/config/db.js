// Importa o módulo mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Importa o módulo dotenv para carregar variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv');

// Configura o dotenv para acessar as variáveis de ambiente definidas no arquivo .env
dotenv.config();

// Define uma função assíncrona para conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a URI fornecida na variável de ambiente MONGO_URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Usa o novo analisador de URL do Mongoose
      useUnifiedTopology: true, // Usa o novo mecanismo de gerenciamento de conexões do Mongoose
    });
    // Exibe uma mensagem no console quando a conexão for bem-sucedida
    console.log('MongoDB conectado');
  } catch (error) {
    // Exibe uma mensagem de erro no console caso a conexão falhe
    console.error('Erro ao conectar ao MongoDB:', error.message);
    // Encerra o processo com um código de erro (1), indicando falha
    process.exit(1);
  }
};

// Exporta a função connectDB para que possa ser usada em outras partes da aplicação
module.exports = connectDB;
