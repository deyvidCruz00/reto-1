# 🔧 Solución a Problemas de Conexión de Base de Datos

## ❌ Problemas Identificados

1. **MySQL ejecutándose en puerto 3306** (conflicto con MySQL local)
2. **MongoDB con credenciales incorrectas** (no coincidían entre docker-compose y aplicación)
3. **Configuraciones inconsistentes** entre servicios individuales y docker-compose principal

## ✅ Soluciones Implementadas

### 1. **MySQL - Puerto Corregido**

**Cambio en `docker-compose.yml`:**
```yaml
mysql:
  ports:
    - "3307:3306"    # Ahora usa puerto 3307 externamente
  environment:
    MYSQL_ROOT_PASSWORD: rootpass
    MYSQL_DATABASE: usermgmt_db
    MYSQL_USER: fastapi  
    MYSQL_PASSWORD: fastapipass
```

**Variables de entorno del User Service actualizadas:**
```yaml
environment:
  - DB_HOST=mysql
  - DB_PORT=3306          # Puerto interno del contenedor
  - DB_NAME=usermgmt_db   # Base de datos correcta
  - DB_USER=fastapi       # Usuario correcto
  - DB_PASSWORD=fastapipass
```

### 2. **MongoDB - Credenciales Corregidas**

**Configuración en `docker-compose.yml` (sin cambios):**
```yaml
mongo:
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: admin123
    MONGO_INITDB_DATABASE: orderdb
```

**Corregido en `orderMgmtMicroservice/src/config/database.js`:**
```javascript
// ANTES (incorrecto):
const mongoURI = process.env.MONGODB_URI || 'mongodb://orderapp:orderapp123@localhost:27017/orderdb?authSource=orderdb';

// DESPUÉS (correcto):
const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/orderdb?authSource=admin';
```

**Variables de entorno del Order Service:**
```yaml
environment:
  - MONGODB_URI=mongodb://admin:admin123@mongo:27017/orderdb?authSource=admin
```

## 🚀 Pasos para Aplicar la Solución

### 1. **Parar servicios existentes**
```bash
docker-compose down -v
```

### 2. **Verificar que no hay conflictos de puertos**
```bash
# Verificar que puerto 3306 esté libre para uso interno
netstat -an | findstr :3306

# Puerto 3307 debería estar disponible para uso externo
netstat -an | findstr :3307
```

### 3. **Recompilar y levantar servicios**
```bash
build.bat
```

### 4. **Diagnosticar problemas si persisten**
```bash
diagnose-issues.bat
```

### 5. **Verificar conexiones**
```bash
verify-databases.bat
```

## 🔍 Verificación de Funcionamiento

### **Puertos Finales:**
- **MySQL**: Externo 3307 → Interno 3306
- **MongoDB**: Externo 27017 → Interno 27017  
- **User Service**: 8000
- **Order Service**: 3000
- **API Gateway**: 8080
- **Eureka**: 8761

### **Conexiones Directas para Testing:**
```bash
# MySQL desde host local (puerto 3307)
mysql -h localhost -P 3307 -u fastapi -pfastapipass usermgmt_db

# MongoDB desde host local (puerto 27017) 
mongosh "mongodb://admin:admin123@localhost:27017/orderdb?authSource=admin"
```

### **Health Checks:**
```bash
curl http://localhost:8000/health  # User Service → MySQL
curl http://localhost:3000/health  # Order Service → MongoDB
```

## 🐛 Troubleshooting Adicional

### **Si MySQL sigue sin conectar:**
```bash
# Ver logs detallados
docker logs mysql-db

# Conectar directamente al contenedor
docker exec -it mysql-db mysql -u root -prootpass
```

### **Si MongoDB sigue sin conectar:**
```bash
# Ver logs detallados  
docker logs mongo-db

# Conectar directamente al contenedor
docker exec -it mongo-db mongosh -u admin -p admin123 --authenticationDatabase admin
```

### **Si los microservicios no pueden conectar:**
```bash
# Verificar variables de entorno
docker exec user-management-service printenv | grep DB_
docker exec order-management-service printenv | grep MONGO
```

## 📋 Archivos Modificados

1. `docker-compose.yml` - Puertos y credenciales corregidas
2. `UserMgmtMicroservice/init.sql` - Base de datos correcta
3. `orderMgmtMicroservice/src/config/database.js` - Credenciales MongoDB
4. `UserMgmtMicroservice/app/database/connection.py` - Credenciales MySQL
5. `verify-databases.bat` - Script de verificación actualizado
6. `diagnose-issues.bat` - Nuevo script de diagnóstico

---

**💡 Nota**: Después de aplicar estos cambios, los servicios deberían conectarse correctamente sin conflictos de puertos.