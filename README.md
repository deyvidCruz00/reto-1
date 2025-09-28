# Microservices Project - Reto 1

Un proyecto completo de microservicios con **Spring Cloud Eureka**, **API Gateway**, gestión de usuarios y pedidos, construido con diferentes tecnologías.

## 🏗️ Arquitectura

```
                    ┌─────────────────┐
                    │   API Gateway   │
                    │   (port 8080)   │
                    └─────────┬───────┘
                              │
                    ┌─────────┴───────┐
                    │ Eureka Server   │
                    │ (port 8761)     │
                    └─────────┬───────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
    ┌─────────┴──────┐ ┌─────────┴──────┐ ┌─────────┴──────┐
    │ User Management│ │Order Management│ │   Databases    │
    │ FastAPI/Python │ │ Express/Node.js│ │ MySQL & MongoDB│
    │  (port 8000)   │ │  (port 3000)   │ │                │
    └────────────────┘ └────────────────┘ └────────────────┘
```

## 🚀 Servicios

### 1. **Eureka Server** (Java/Spring Boot)
- **Puerto**: 8761  
- **Función**: Service Discovery y Registry
- **URL**: http://localhost:8761

### 2. **API Gateway** (Java/Spring Cloud Gateway)
- **Puerto**: 8080
- **Función**: Enrutamiento y balanceador de carga
- **URL**: http://localhost:8080

### 3. **User Management Service** (Python/FastAPI)
- **Puerto**: 8000
- **Base de datos**: MySQL
- **Función**: Gestión de usuarios/clientes
- **Endpoints**:
  - `GET /customers` - Listar clientes
  - `POST /customers` - Crear cliente
  - `GET /customers/{id}` - Obtener cliente
  - `PUT /customers/{id}` - Actualizar cliente
  - `DELETE /customers/{id}` - Eliminar cliente

### 4. **Order Management Service** (Node.js/Express)
- **Puerto**: 3000
- **Base de datos**: MongoDB
- **Función**: Gestión de pedidos
- **Endpoints**:
  - `GET /api/orders` - Listar pedidos
  - `POST /api/orders` - Crear pedido
  - `GET /api/orders/{id}` - Obtener pedido
  - `PUT /api/orders/{id}` - Actualizar pedido
  - `DELETE /api/orders/{id}` - Eliminar pedido

## 🛠️ Tecnologías Utilizadas

- **Java 17** + Spring Boot + Spring Cloud
- **Python 3.11** + FastAPI + SQLAlchemy
- **Node.js 18** + Express + Mongoose
- **Docker** + Docker Compose
- **MySQL 8.0** + **MongoDB 7.0**
- **Maven** para proyectos Java

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Docker y Docker Compose
- Java 17 (para desarrollo local)
- Python 3.11+ (para desarrollo local)
- Node.js 18+ (para desarrollo local)

### Ejecución Rápida con Docker

#### Opción 1: Build Completo
```bash
./build.bat
```

#### Opción 2: Build Simplificado
```bash
./build-simple.bat
```

#### Opción 3: Solo Bases de Datos
```bash
docker-compose up -d mysql mongo
```

### Ejecución Manual por Pasos

1. **Compilar servicios Java**:
   ```bash
   cd eureka-server && mvn clean package
   cd ../api-gateway && mvn clean package
   ```

2. **Levantar bases de datos**:
   ```bash
   docker-compose up -d mysql mongo
   ```

3. **Levantar Eureka Server**:
   ```bash
   docker-compose up -d eureka-server
   ```

4. **Levantar API Gateway**:
   ```bash
   docker-compose up -d api-gateway
   ```

5. **Levantar microservicios**:
   ```bash
   docker-compose up -d user-management-service order-management-service
   ```

## 🔧 Scripts de Utilidad

- **`build.bat`**: Build completo con verificaciones
- **`build-simple.bat`**: Build simplificado para desarrollo rápido
- **`cleanup-docker.bat`**: Limpieza de Docker para liberar espacio
- **`diagnose-issues.bat`**: Diagnóstico general de problemas
- **`diagnose-mysql.bat`**: Diagnóstico específico de MySQL
- **`quick-rebuild-user.bat`**: Rebuild rápido solo del User Service
- **`test-eureka-registration.bat`**: Test de registro en Eureka

## 🔍 URLs Importantes

- **Eureka Dashboard**: http://localhost:8761
- **API Gateway Health**: http://localhost:8080/actuator/health
- **User Service**: http://localhost:8000/docs (Swagger UI)
- **Order Service**: http://localhost:3000/api/orders

## 🐛 Diagnóstico y Solución de Problemas

### Problemas Comunes

1. **Eureka no se registra**: Usar `test-eureka-registration.bat`
2. **MySQL connection issues**: Usar `diagnose-mysql.bat`
3. **Servicios no levantan**: Usar `diagnose-issues.bat`
4. **Espacio en disco**: Usar `cleanup-docker.bat`

### Health Checks
```bash
# Verificar estado de todos los servicios
docker-compose ps

# Ver logs de un servicio específico
docker-compose logs -f user-management-service

# Verificar conectividad de bases de datos
./verify-databases.bat
```

## 📊 Variables de Entorno

### User Management Service (Python)
```env
DB_HOST=mysql
DB_PORT=3306
DB_NAME=usermgmt_db
DB_USER=fastapi
DB_PASSWORD=fastapipass
EUREKA_SERVER_URL=http://eureka-server:8761/eureka/
```

### Order Management Service (Node.js)
```env
MONGODB_URI=mongodb://mongo:27017/order_management
NODE_ENV=production
PORT=3000
EUREKA_SERVER_URL=http://eureka-server:8761/eureka/
```

## 📁 Estructura del Proyecto

```
reto-1/
├── api-gateway/           # Java Spring Cloud Gateway
├── eureka-server/         # Java Spring Boot Eureka
├── UserMgmtMicroservice/  # Python FastAPI
├── orderMgmtMicroservice/ # Node.js Express
├── docker-compose.yml     # Configuración Docker
├── *.bat                  # Scripts de automatización
└── README.md             # Este archivo
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear una branch para tu feature
3. Commit de tus cambios
4. Push a la branch
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**¿Problemas?** Revisa los archivos de documentación específicos:
- `BUILD-SCRIPTS.md` - Documentación de scripts
- `DATABASE-FIX.md` - Solución de problemas de BD
- `EUREKA-FIX.md` - Solución de problemas de Eureka