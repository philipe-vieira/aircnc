const express = require( 'express' );
const multer = require('multer' );
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');


const routes = express.Router();
const upload = multer(uploadConfig);

// ROTAS TESTE
routes.get('/users', (req, res) => {
    return res.json({idade: req.query.idade});
});
routes.post('/users', (req, res) => {
    return res.json( req.body );
});
routes.put('/users/:id', (req, res) => {
    return res.json({id: req.params.id});
});

//  SESSIONS
routes.post('/sessions', SessionController.store);

//  SPOTS
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

//  DASHBOARD
routes.get('/dashboard', DashboardController.show);

// BOOKINGS
routes.post('/spots/:spot_id/bookings', BookingController.store);



module.exports = routes; 