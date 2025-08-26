const express = require('express');
const router = express.Router();

// Import controller functions
const { Hs_Anx } = require('./Controller/historias');
const { FacturaElectronica } = require('./Controller/facturaelectronica');
const { obtenerDatosLogin } = require('./Controller/Base/toke');
const { BatAuto } = require('./descargar/descargar');
// area de gereadorde url pdf
router.get('/Hs_Anx', Hs_Anx);
router.get('/facturaElectronica', FacturaElectronica);


//area de cosultas
router.post('/descargar', BatAuto);
router.post('/api/institucion', obtenerDatosLogin);

// Route to test server
router.get('/', (req, res) => {
  res.send('Hola Mundo'); // Send a response to the client
});

module.exports = router;
