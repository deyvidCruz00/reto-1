# API Gateway con Spring Eureka - Arquitectura de Microservicios

Este proyecto implementa una arquitectura de microservicios con API Gateway y Service Discovery usando Spring Boot, Eureka Server y Spring Cloud Gateway.

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│                 │    │                  │    │                     │
│   Client Apps   │───▶│   API Gateway    │───▶│   Eureka Server     │
│                 │    │   (Port 8080)    │    │   (Port 8761)       │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                │                         │
                                │                         │
                                ▼                         ▼
                       ┌─────────────────┐     ┌─────────────────────┐
                       │                 │     │                     │
                       │ Order Service   │◀────┤ User Service        │
                       │ (Node.js:3000)  │     │ (FastAPI:8000)      │
                       │                 │     │                     │
                       └─────────────────┘     └─────────────────────┘
                                │                         │
                                ▼                         ▼
                       ┌─────────────────┐     ┌─────────────────────┐
                       │   MongoDB       │     │      MySQL          │
                       │   (Port 27017)  │     │   (Port 3306)       │
                       └─────────────────┘     └─────────────────────┘
```

## 📋 Servicios

### 1. Eureka Server (Puerto 8761)
- **Función**: Service Discovery y Registry
- **Tecnología**: Spring Boot + Netflix Eureka
- **URL**: http://localhost:8761

### 2. API Gateway (Puerto 8080)
- **Función**: Gateway de entrada único para todos los microservicios
- **Tecnología**: Spring Cloud Gateway
- **URL**: http://localhost:8080

### 3. Order Management Service (Puerto 3000)
- **Función**: Gestión de órdenes/pedidos
- **Tecnología**: Node.js + Express + MongoDB
- **Nombre en Eureka**: `order-management-service`

### 4. User Management Service (Puerto 8000)
- **Función**: Gestión de usuarios/clientes
- **Tecnología**: Python + FastAPI + MySQL
- **Nombre en Eureka**: `user-management-service`

## 🚀 Despliegue

### Pre-requisitos
- Docker y Docker Compose
- Java 17+ (para compilar los servicios Spring)
- Maven 3.8+

### Pasos de Despliegue

1. **Clonar o ubicarse en el directorio del proyecto**
   ```bash
   cd c:\Users\Usuario\soft-2\reto-1
   ```

2. **Compilar los servicios Spring Boot**
   ```bash
   # Compilar Eureka Server
   cd eureka-server
   mvn clean package -DskipTests
   cd ..

   # Compilar API Gateway
   cd api-gateway
   mvn clean package -DskipTests
   cd ..
   ```

3. **Levantar todos los servicios (incluye inicialización automática de bases de datos)**
   ```bash
   docker-compose up --build
   ```

4. **Verificar el estado de los servicios y bases de datos**
   ```bash
   # Ejecutar script de verificación
   verify-databases.bat
   
   # O verificar manualmente:
   # Eureka Server: http://localhost:8761
   # API Gateway Health: http://localhost:8080/actuator/health
   # Order Service Health: http://localhost:3000/health
   # User Service Health: http://localhost:8000/health
   ```

### 🗄️ Inicialización Automática de Bases de Datos

Las bases de datos se inicializan **automáticamente** con datos de prueba:

**MySQL (User Service):**
- Base de datos: `userdb`
- Tabla: `customers` con usuarios de prueba
- Credenciales: user/password

**MongoDB (Order Service):**
- Base de datos: `orderdb`
- Colección: `orders` con órdenes de ejemplo
- Credenciales: admin/admin123

Ver [`DATABASE-INITIALIZATION.md`](./DATABASE-INITIALIZATION.md) para detalles completos.

## 📡 Uso del API Gateway

### Rutas Configuradas

#### Order Service (a través del API Gateway)
```bash
# Crear orden
POST http://localhost:8080/api/order/createorder
Content-Type: application/json

{
    "customerId": "123",
    "items": [...],
    "total": 100.50
}

# Actualizar estado de orden
POST http://localhost:8080/api/order/updateorderstatus
Content-Type: application/json

{
    "orderId": "order123",
    "status": "completed"
}

# Buscar orden por customer ID
POST http://localhost:8080/api/order/findorderbycustomerid
Content-Type: application/json

{
    "customerId": "123"
}
```

#### User Service (a través del API Gateway)
```bash
# Crear cliente
POST http://localhost:8080/api/customer/createcustomer
Content-Type: application/json

{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "document": "12345678"
}

# Health check de servicios
GET http://localhost:8080/api/order-health
GET http://localhost:8080/api/user-health
```

## 🔍 Service Discovery

### Nombres de Servicios en Eureka
- `order-management-service`: Order Management Microservice
- `user-management-service`: User Management Microservice
- `api-gateway`: API Gateway

### Comunicación entre Microservicios

Los microservicios pueden comunicarse entre ellos usando los nombres registrados en Eureka:

**Desde Order Service a User Service:**
```javascript
// En Node.js
const userServiceUrl = 'http://user-management-service:8000/customer/getcustomer';
```

**Desde User Service a Order Service:**
```python
# En Python
import requests
order_service_url = "http://order-management-service:3000/order/findorderbycustomerid"
```

## 🏥 Health Checks

Todos los servicios implementan health checks:

- **Eureka Server**: `http://eureka-server:8761/actuator/health`
- **API Gateway**: `http://api-gateway:8080/actuator/health`
- **Order Service**: `http://order-service:3000/health`
- **User Service**: `http://user-service:8000/health`

## 🛠️ Configuración de Desarrollo

### Variables de Entorno

#### Order Service (Node.js)
```env
PORT=3000
MONGODB_URI=mongodb://admin:admin123@mongo:27017/orderdb?authSource=admin
EUREKA_HOST=eureka-server
EUREKA_PORT=8761
```

#### User Service (Python)
```env
PORT=8000
DB_HOST=mysql
DB_PORT=3306
DB_NAME=userdb
DB_USER=user
DB_PASSWORD=password
EUREKA_SERVER=http://eureka-server:8761/eureka
```

## 🧪 Testing

### Probar el registro en Eureka
1. Acceder a http://localhost:8761
2. Verificar que aparezcan los servicios:
   - `ORDER-MANAGEMENT-SERVICE`
   - `USER-MANAGEMENT-SERVICE`
   - `API-GATEWAY`

### Probar las rutas del API Gateway
```bash
# Test básico de conectividad
curl http://localhost:8080/actuator/health

# Test de enrutamiento
curl -X POST http://localhost:8080/api/order-health
curl -X POST http://localhost:8080/api/user-health
```

## 🔧 Troubleshooting

### Problemas Comunes

1. **Servicios no se registran en Eureka**
   - Verificar que Eureka Server esté ejecutándose
   - Revisar logs de conexión
   - Verificar configuración de red Docker

2. **API Gateway no puede enrutar**
   - Verificar que los servicios estén registrados en Eureka
   - Revisar configuración de rutas en `application.yml`

3. **Problemas de base de datos**
   - Verificar que las bases de datos estén saludables
   - Revisar scripts de inicialización

### Comandos Útiles

```bash
# Ver logs de un servicio específico
docker-compose logs -f eureka-server
docker-compose logs -f api-gateway
docker-compose logs -f order-service
docker-compose logs -f user-service

# Reiniciar un servicio específico
docker-compose restart eureka-server

# Parar todos los servicios
docker-compose down

# Limpiar volúmenes (cuidado: borra datos)
docker-compose down -v
```

## 📚 Documentación Adicional

- [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
- [Netflix Eureka](https://github.com/Netflix/eureka)
- [Eureka JS Client](https://github.com/jquatier/eureka-js-client)
- [Py Eureka Client](https://github.com/keijack/py-eureka-client)