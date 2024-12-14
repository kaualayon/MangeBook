const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); 

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Valida o campo role
  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Tipo de conta inválido.' });
  }

  try {
    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário com nome de usuário e senha criptografada
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save(); // Salva o usuário no banco de dados

    return res.status(201).json({ message: 'Usuário registrado com sucesso!' }); // Responde com sucesso ao registrar
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao registrar usuário!' }); // Responde com erro ao registrar
  }
};

// Função para fazer login de usuários
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  // Verifica se os campos de email e senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, forneça ambos os campos: email e senha.' });
  }

  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user); // Loga os dados do usuário
    console.log('Senha fornecida:', password); // Loga a senha fornecida

    // Verifica se o usuário está bloqueado
    if (!user.active) {
      return res.status(403).json({ error: 'Usuário bloqueado. Não é possível fazer login.' });
    }

    // Compara a senha fornecida com a armazenada no banco de dados
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      console.log('Senha incorreta');
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    // Verifica se o `role` enviado é permitido
    if (role !== user.role) {
      if (role === 'admin' && user.role !== 'admin') {
        return res.status(403).json({ message: 'Permissão negada para entrar como Administrador.' });
      }

      // (Opcional) Atualizar o `role` caso seja permitido
      // user.role = role;
      // await user.save();
    }

    console.log('Senha correta');

    // Cria um JWT Token com o id e role do usuário, definindo o tempo de expiração para 1h
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retorna o token e as informações do usuário como resposta
    return res.status(200).json({ message: 'Login realizado', token, user });

  } catch (error) {
    console.error(error); // Loga o erro
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};


exports.getUser = async (req, res) => {
  // Tente pegar o token do cabeçalho da requisição
  const token = req.headers.authorization?.split(' ')[1]; // Obtém o token que está no formato "Bearer <token>"

  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' }); // Se não houver token, retorna erro
  }

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token usando a chave secreta

    // Busca o usuário no banco de dados com o ID decodificado
    const user = await User.findById(decoded.id); // Aqui, "decoded.id" é o ID do usuário no token

    // Se o usuário não for encontrado
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Retorna apenas o username do usuário, sem os outros dados
    res.json({ username: user.username, role: user.role, });
  } catch (err) {
    // Caso ocorra algum erro, como um erro na verificação do token
    return res.status(500).json({ error: 'Erro ao obter dados do usuário' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário extraído pelo middleware

    // Busca os dados do usuário
    const user = await User.findById(userId).select('-password'); // Não retorna a senha
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Busca empréstimos e reservas
    const loans = await Loan.find({ userId });
    const reservations = await Reservation.find({ userId });

    // Retorna os dados
    res.json({
      user: {
        name: user.name,
        email: user.email,
        registrationDate: user.createdAt,
      },
      loans,
      reservations,
    });
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.' });
  }
};


// Atualiza o status ativo/inativo de um usuário
exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params; // ID do usuário vindo dos parâmetros
  const { active } = req.body; // Novo status ativo/inativo

  try {
    // Verifica se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza o status
    user.active = active;
    await user.save();

    res.status(200).json({ message: 'Status do usuário atualizado com sucesso', user });
  } catch (error) {
    console.error('Erro ao atualizar o status do usuário:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar o status do usuário' });
  }
};

exports.editUser = async (req, res) => {
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

    res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};