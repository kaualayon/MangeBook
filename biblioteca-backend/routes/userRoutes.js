const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { User } = require('../models/User');

// Pegando a lista de usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

//Pegando o usuario especifico
router.get('/user', async (req, res) => {
  try {
    // Verifica se o token existe no cabeçalho da requisição
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Busca o usuário usando o ID decodificado do token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Retorna o username do usuário
    res.json({ username: user.username });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter dados do usuário' });
  }
});




// Rota POST para criar um novo usuário
router.post('/register', async (req, res) => {
  const {username, email, password} = req.body;
  
  //verifica se o usuário já existe
  const userExists = users.find(user => user.email === email);
  if(userExists){
    return res.status(400).json({message: 'Usuário já existe com esse email!'})
  }

  //Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({username, password:hashedPassword});

  res.status(201).json({message: 'Usuário registrado com sucesso!'});
});


//Rota para login
router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = users.find(user => user.email === email);

  // Verifica se o usuário está ativo
  if (!user.active) {
    return res.status(403).json({ message: 'Conta desativada. Entre em contato com o suporte.' });
  }

  

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }


  if(!user || !(await bcrypt.compare(password, user.password))){
    return res.status(401).json({message: 'Credenciais inválidas!'});
  }

  


  const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
  res.json({token});
});

//Rota Patch para status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { active }, { new: true });
    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao atualizar usuário' });
  }
});


//Rota para deletar usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }
    res.send({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao excluir usuário' });
  }
});

//Rota para atualizar usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, active } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, active },
      { new: true } // Retorna o usuário atualizado
    );

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

module.exports = router;
