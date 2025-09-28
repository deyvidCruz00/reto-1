# 🐳 Configuración de MongoDB con Docker

Esta guía te explica cómo ejecutar MongoDB usando Docker Compose para el microservicio de pedidos.

## 📋 Prerequisitos

- Docker instalado en tu sistema
- Docker Compose instalado (incluido con Docker Desktop)

## 🚀 Configuración y Ejecución

### 1. Ejecutar MongoDB con Docker Compose

```bash
# Ejecutar MongoDB en segundo plano
docker-compose up -d mongodb

# Ver logs de inicialización
docker-compose logs -f mongodb
```

### 2. Verificar que MongoDB esté ejecutándose

```bash
# Ver contenedores activos
docker ps

# Deberías ver algo como:
# CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                      NAMES
# xxxxxxxxxxxxx  mongo:7.0 "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:27017->27017/tcp   orderdb_mongodb
```

### 3. Ejecutar tu microservicio

```bash
# Instalar dependencias (si no las tienes)
npm install

# Ejecutar el microservicio en modo desarrollo
npm run dev
```

## 📊 Configuración de la Base de Datos

### Datos de Acceso

- **Host:** localhost
- **Puerto:** 27017
- **Base de datos:** orderdb
- **Usuario Admin:** admin / password123
- **Usuario App:** orderapp / orderapp123

### Datos Incluidos

El script de inicialización (`docker/mongo-init.js`) automáticamente:

✅ Crea el usuario `orderapp` con permisos de lectura/escritura
✅ Crea la colección `orders` con validación de esquema
✅ Crea índices optimizados para consultas
✅ Inserta 4 órdenes de ejemplo para pruebas

### Órdenes de Ejemplo

```json
[
  {"customerID": "CUST001", "orderID": "ORD001", "status": "Received"},
  {"customerID": "CUST001", "orderID": "ORD002", "status": "In progress"},
  {"customerID": "CUST002", "orderID": "ORD003", "status": "Sended"},
  {"customerID": "CUST003", "orderID": "ORD004", "status": "Received"}
]
```

## 🔧 Comandos Útiles

### Gestión de Contenedores

```bash
# Iniciar MongoDB
docker-compose up -d mongodb

# Ver logs en tiempo real
docker-compose logs -f mongodb

# Detener MongoDB
docker-compose down

# Detener y eliminar volúmenes (⚠️ Borra todos los datos!)
docker-compose down -v

# Recrear contenedor desde cero
docker-compose down -v && docker-compose up -d mongodb
```

### Acceso a MongoDB

```bash
# Conectar a MongoDB Shell
docker exec -it orderdb_mongodb mongosh

# Conectar con autenticación
docker exec -it orderdb_mongodb mongosh -u admin -p password123 --authenticationDatabase admin

# Conectar directamente a la base de datos orderdb
docker exec -it orderdb_mongodb mongosh orderdb
```

### Consultas de Verificación

```bash
# Ver todas las órdenes
docker exec -it orderdb_mongodb mongosh orderdb --eval "db.orders.find().pretty()"

# Contar órdenes por cliente
docker exec -it orderdb_mongodb mongosh orderdb --eval "db.orders.aggregate([{$group: {_id: '$customerID', count: {$sum: 1}}}])"

# Ver índices creados
docker exec -it orderdb_mongodb mongosh orderdb --eval "db.orders.getIndexes()"
```

## 🧪 Probar el Microservicio

### 1. Verificar Salud del Servicio

```bash
curl http://localhost:3000/health
```

### 2. Crear una Nueva Orden

```bash
curl -X POST http://localhost:3000/order/createorder \
  -H "Content-Type: application/json" \
  -d '{"customerid":"TEST001","orderID":"TESTORD001","status":"Received"}'
```

### 3. Buscar Órdenes por Cliente

```bash
curl -X POST http://localhost:3000/order/findorderbycustomerid \
  -H "Content-Type: application/json" \
  -d '{"customerid":"CUST001"}'
```

### 4. Actualizar Estado de Orden

```bash
curl -X POST http://localhost:3000/order/updateorderstatus \
  -H "Content-Type: application/json" \
  -d '{"orderID":"ORD001","status":"In progress"}'
```

## 📁 Estructura de Archivos Docker

```
orderMgmtMicroservice/
├── docker-compose.yml           # Configuración de servicios Docker
└── docker/
    └── mongo-init.js           # Script de inicialización de MongoDB
```

## 🔍 Troubleshooting

### Problema: Puerto 27017 en uso

```bash
# Verificar qué proceso usa el puerto
netstat -ano | findstr :27017

# Cambiar puerto en docker-compose.yml si es necesario
ports:
  - "27018:27017"  # Usar puerto 27018 en lugar de 27017
```

### Problema: Datos no aparecen

```bash
# Verificar que el contenedor se haya inicializado correctamente
docker-compose logs mongodb

# Recrear contenedor con datos frescos
docker-compose down -v
docker-compose up -d mongodb
```

### Problema: Error de conexión desde la aplicación

```bash
# Verificar que MongoDB esté escuchando
docker exec -it orderdb_mongodb mongosh --eval "db.adminCommand('ismaster')"

# Verificar variables de entorno en tu .env
cat .env
```

## 🎯 Siguiente Paso

Una vez que MongoDB esté ejecutándose, puedes probar todos los endpoints de tu microservicio usando las órdenes de ejemplo que se crearon automáticamente.