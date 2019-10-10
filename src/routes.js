//Importação do express
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

//Inicialização das rotas do express em uma variável
const routes = express.Router();
const upload = multer(uploadConfig);

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição e delete)
//req.body = Acessar corpo da requisição (criação, edição, etc)

//Rota post de usuários
routes.post('/sessions', SessionController.store);
//Rota post de spots
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

//Rota get de spots
routes.get('/spots', SpotController.index);

//Rota get de dashboard
routes.get('/dashboard', DashboardController.show);

//Rota post de dashboard
routes.post('/spots/:spot_id/bookings', BookingController.store);


//Rotas de aprovação e rejeição
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

//Exporta todas as rotas do sistema
module.exports = routes;