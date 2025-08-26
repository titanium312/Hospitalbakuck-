const express = require('express');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear solicitudes JSON
app.use(fileUpload()); // Permitir carga de archivos

// Manejo global de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  // Aquí puedes decidir si terminar el proceso con process.exit(1)
  // o dejarlo correr para depuración.
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rechazo no manejado:', reason);
});

// Rutas de tu servidor
try {
  const router = require('./routes/router');
  app.use(router);
} catch (err) {
  console.error('Error cargando las rutas:', err);
}

// Iniciar el servidor
try {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('Error iniciando el servidor:', err);
}
