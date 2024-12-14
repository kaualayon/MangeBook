const mongoose = require('mongoose');

// Substitua pela URI do seu MongoDB Atlas
const uri = 'mongodb+srv://limakaua582:k07120629@library.r5nfy.mongodb.net/library';

// Conecte ao MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    
      role: { type: String, default: "user" },
    
      active: { type: Boolean, default: true } // Campo para status do usuário
});

const User = mongoose.model('User', userSchema);

mongoose.connection.once('open', async () => {
  console.log('Conectado ao MongoDB Atlas');
  try {
    // Atualizar todos os usuários para adicionar o campo active
    const result = await User.updateMany({}, { $set: { active: true } });
    console.log(`Atualizados ${result.modifiedCount} usuários`);
  } catch (error) {
    console.error('Erro ao atualizar usuários:', error);
  } finally {
    mongoose.connection.close();
  }
});
