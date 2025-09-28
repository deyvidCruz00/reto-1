const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Configurar URI de conexión con autenticación
    const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/orderdb?authSource=admin';
    
    // Configurar opciones de conexión
    const options = {
      authSource: 'admin', // Base de datos donde están las credenciales de root
      retryWrites: true,
      w: 'majority'
    };

    console.log('🔄 Conectando a MongoDB con autenticación...');
    console.log('🔗 URI:', mongoURI.replace(/:[^:]*@/, ':***@')); // Ocultar password en logs
    
    const conn = await mongoose.connect(mongoURI, options);
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}:${conn.connection.port}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    console.log(`🔐 Autenticación: Exitosa`);
    
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error.message);
    console.error('💡 Verifica que MongoDB esté ejecutándose y las credenciales sean correctas');
    
    // Intentar reconexión en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Reintentando conexión en 5 segundos...');
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;