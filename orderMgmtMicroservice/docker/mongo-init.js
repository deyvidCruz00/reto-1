// Script de inicialización para MongoDB
// Este archivo se ejecuta automáticamente cuando se crea el contenedor por primera vez

print('🚀 Iniciando configuración de base de datos orderdb...');

// Cambiar a la base de datos orderdb
db = db.getSiblingDB('orderdb');

// Crear usuario específico para la aplicación
db.createUser({
  user: 'orderapp',
  pwd: 'orderapp123',
  roles: [
    {
      role: 'readWrite',
      db: 'orderdb'
    }
  ]
});

print('✅ Usuario orderapp creado correctamente');

// Crear la colección orders con validación de esquema
db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['customerID', 'orderID', 'status'],
      properties: {
        customerID: {
          bsonType: 'string',
          description: 'Customer ID debe ser string y es requerido'
        },
        orderID: {
          bsonType: 'string',
          description: 'Order ID debe ser string y es requerido'
        },
        status: {
          bsonType: 'string',
          enum: ['Received', 'In progress', 'Sended'],
          description: 'Status debe ser uno de: Received, In progress, Sended'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Fecha de creación'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Fecha de actualización'
        }
      }
    }
  }
});

print('✅ Colección orders creada con validación de esquema');

// Crear índices para optimizar las consultas
db.orders.createIndex({ 'orderID': 1 }, { unique: true });
db.orders.createIndex({ 'customerID': 1 });
db.orders.createIndex({ 'status': 1 });

print('✅ Índices creados: orderID (único), customerID, status');

// Insertar datos de ejemplo para pruebas
db.orders.insertMany([
  {
    customerID: 'CUST001',
    orderID: 'ORD001',
    status: 'Received',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    customerID: 'CUST001',
    orderID: 'ORD002',
    status: 'In progress',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    customerID: 'CUST002',
    orderID: 'ORD003',
    status: 'Sended',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    customerID: 'CUST003',
    orderID: 'ORD004',
    status: 'Received',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('✅ Datos de ejemplo insertados: 4 órdenes de prueba');

// Verificar la configuración
const orderCount = db.orders.countDocuments();
const indexes = db.orders.getIndexes();

print('📊 Resumen de configuración:');
print(`   - Órdenes insertadas: ${orderCount}`);
print(`   - Índices creados: ${indexes.length}`);
print('🎉 ¡Base de datos orderdb configurada exitosamente!');

// Mostrar datos insertados para verificación
print('📋 Datos de ejemplo insertados:');
db.orders.find().forEach(function(doc) {
  print(`   CustomerID: ${doc.customerID}, OrderID: ${doc.orderID}, Status: ${doc.status}`);
});