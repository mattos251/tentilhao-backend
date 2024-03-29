const express = require('express');
const generosControllers = require('./controllers/generosControllers');
const userControllers = require('./controllers/userControllers');
const composicaoControllers = require('./controllers/composicaoControllers');
const composicoesUserController = require('./controllers/compositorUserControllers');
const authMiddleware = require('./middleware/authMiddleware');

const router = express.Router();

// Rotas públicas (não requerem autenticação)
router.post('/usuarios/cadastro', userControllers.cadastrarUsuario);
router.post('/login', userControllers.loginUsuario);

router.get('/generos', generosControllers.getAllGeneros);
// Middleware de autenticação aplicado a partir deste ponto
router.use(authMiddleware);

// Rotas protegidas (requerem autenticação)

router.get('/usuarios/pesquisar', userControllers.pesquisarUsuarios);
router.get('/usuarios', userControllers.getAllUsuarios);
router.get('/usuario/:id',  userControllers.getUserById);
router.put('/usuarios/updateUser/:id', userControllers.putUser);
router.put('/usuarios/updateImage/:id', userControllers.putImageUser);

router.get('/composicoes/', composicaoControllers.getAllComposicoes);
router.get('/composicoesUser/:id', composicoesUserController.getComposicoesByUsuarioId);
router.get('/composicoesGeneros/:genero', composicaoControllers.getAllComposicoesByGenres);

router.post('/cadastro/ComposicaoUser', composicoesUserController.postComposicaoByUsuario);
router.put('/atualizar/Composicao/:id', composicoesUserController.putComposicaoByUsuario);
router.delete('/deletar/Composicao/:id', composicoesUserController.deleteComposicaoByUsuario);

module.exports = router;
