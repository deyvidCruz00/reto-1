require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const orderRoutes = require('./src/routes/orderRoutes');
const eurekaClient = require('./src/config/eureka');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/order', orderRoutes);

// Ruta de salud del microservicio
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Order Management Microservice is running',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The route ${req.method} ${req.originalUrl} does not exist`
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Order Management Microservice running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  
  // Registrar el servicio en Eureka
  eurekaClient.start(error => {
    if (error) {
      console.error('Eureka registration failed:', error);
    } else {
      console.log('Service registered with Eureka successfully');
    }
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  eurekaClient.stop(() => {
    console.log('Eureka client stopped');
    process.exit(0);
  });
});