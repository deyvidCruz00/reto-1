# 🗄️ Inicialización de Bases de Datos

## Resumen
Las bases de datos se inicializan **automáticamente** cuando ejecutas `docker-compose up --build` por primera vez. No requiere pasos manuales adicionales.

## 📊 MySQL - User Management Service

### Configuración en docker-compose.yml
```yaml
mysql:
  image: mysql:8.0
  container_name: mysql-db
  environment:
    MYSQL_ROOT_PASSWORD: rootpassword
    MYSQL_DATABASE: userdb           # Base de datos principal
    MYSQL_USER: user                 # Usuario principal
    MYSQL_PASSWORD: password         # Contraseña del usuario
  volumes:
    - ./UserMgmtMicroservice/init.sql:/docker-entrypoint-initdb.d/init.sql
```

### ¿Qué hace el archivo init.sql?
El archivo `UserMgmtMicroservice/init.sql` se ejecuta **automáticamente** al crear el contenedor y:

1. **Crea la base de datos**: `userdb`
2. **Crea la tabla**: `customers` con campos:
   - `id` (PRIMARY KEY, AUTO_INCREMENT)
   - `document` (UNIQUE)
   - `firstname`, `lastname`
   - `address`, `phone`
   - `email` (UNIQUE)
3. **Inserta datos de prueba**:
   - Juan Pérez (document: 12345678)
   - María González (document: 87654321)
4. **Crea usuario adicional**: `fastapi` con permisos completos

### Variables de entorno del microservicio Python
```bash
DB_HOST=mysql
DB_PORT=3306
DB_NAME=userdb
DB_USER=user
DB_PASSWORD=password
```

## 🍃 MongoDB - Order Management Service

### Configuración en docker-compose.yml
```yaml
mongo:
  image: mongo:7.0
  container_name: mongo-db
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: admin123
    MONGO_INITDB_DATABASE: orderdb      # Base de datos inicial
  volumes:
    - ./orderMgmtMicroservice/docker/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
```

### ¿Qué hace el archivo mongo-init.js?
El archivo `orderMgmtMicroservice/docker/mongo-init.js` se ejecuta **automáticamente** y:

1. **Selecciona la base de datos**: `orderdb`
2. **Crea usuario específico**: `orderapp` con contraseña `orderapp123`
3. **Crea la colección**: `orders` con validación de esquema JSON
4. **Define estructura de documentos**:
   - `customerID` (requerido)
   - `orderID` (requerido) 
   - `status` (requerido)
   - `items` (array de productos)
   - `totalAmount` (número)
   - `createdAt`, `updatedAt` (fechas)
5. **Inserta órdenes de ejemplo** para testing

### Variables de entorno del microservicio Node.js
```bash
MONGODB_URI=mongodb://admin:admin123@mongo:27017/orderdb?authSource=admin
```

## 🚀 Proceso de Inicialización Completo

### Orden de inicio (manejado por docker-compose)
```
1. 🗄️  Bases de datos (MySQL + MongoDB)
   ├── Ejecutan scripts de inicialización
   ├── Crean usuarios y permisos
   └── Insertan datos de prueba

2. 🔍  Eureka Server
   └── Inicia el registry de servicios

3. 🌐  API Gateway
   └── Se conecta a Eureka y queda listo para enrutamiento

4. 📦  Microservicios
   ├── Order Service → Se conecta a MongoDB
   ├── User Service → Se conecta a MySQL
   └── Ambos se registran en Eureka
```

## 🔧 Comandos Útiles

### Ver el estado de las bases de datos
```bash
# MySQL
docker exec -it mysql-db mysql -u root -prootpassword -e "SHOW DATABASES; USE userdb; SHOW TABLES; SELECT * FROM customers;"

# MongoDB
docker exec -it mongo-db mongosh -u admin -p admin123 --authenticationDatabase admin --eval "use orderdb; show collections; db.orders.find().pretty()"
```

### Conectarse directamente a las bases de datos
```bash
# MySQL
docker exec -it mysql-db mysql -u user -ppassword userdb

# MongoDB
docker exec -it mongo-db mongosh -u admin -p admin123 --authenticationDatabase admin orderdb
```

### Verificar logs de inicialización
```bash
# Ver logs de inicialización de MySQL
docker-compose logs mysql

# Ver logs de inicialización de MongoDB  
docker-compose logs mongo
```

## 🔄 Reinicialización

### Para reinicializar completamente las bases de datos:
```bash
# Parar servicios y eliminar volúmenes
docker-compose down -v

# Volver a levantar (se ejecutarán los scripts de init nuevamente)
docker-compose up --build
```

### Para mantener los datos:
```bash
# Parar servicios manteniendo volúmenes
docker-compose down

# Reiniciar servicios con datos existentes
docker-compose up
```

## 📋 Verificación de Funcionamiento

### Health Checks incluidos en docker-compose:
```bash
# MySQL
test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-prootpassword"]

# MongoDB  
test: echo 'db.runCommand("ping").ok' | mongosh mongodb://admin:admin123@localhost:27017/admin --quiet
```

### Verificar conectividad desde microservicios:
```bash
# Test User Service → MySQL
curl http://localhost:8000/health

# Test Order Service → MongoDB
curl http://localhost:3000/health
```

## 🎯 Datos de Prueba Disponibles

### MySQL (customers table)
- **Juan Pérez**: document=12345678, email=juan.perez@email.com
- **María González**: document=87654321, email=maria.gonzalez@email.com

### MongoDB (orders collection)
- Órdenes de ejemplo con diferentes estados
- Estructura JSON completa para testing
- Validación de esquema activada

---

**💡 Nota importante**: Los scripts de inicialización solo se ejecutan la **primera vez** que se crean los contenedores. Si necesitas re-ejecutarlos, debes eliminar los volúmenes con `docker-compose down -v`.