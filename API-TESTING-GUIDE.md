# 🧪 Guía Completa de Testing - Microservicios a través del API Gateway

Esta guía te permite probar todos los endpoints de ambos microservicios a través del API Gateway.

## 📋 Prerequisitos

1. **Levantar el sistema completo:**
```bash
docker-compose up -d
```

2. **Verificar que todos los servicios estén healthy:**
```bash
docker-compose ps
```

3. **Esperar que Eureka registre todos los servicios (60-90 segundos):**
```bash
# Verificar registro en Eureka
curl http://localhost:8761/
```

---

## 🏥 1. HEALTH CHECKS

### ✅ Health Check - User Service
```bash
curl -X GET "http://localhost:8080/api/user-health" \
  -H "Content-Type: application/json"
```

**Respuesta esperada:**
```json
{
  "status": "healthy",
  "service": "UserMgmtMicroservice",
  "message": "Service is up and running",
  "database": "connected"
}
```

### ✅ Health Check - Order Service
```bash
curl -X GET "http://localhost:8080/api/order-health" \
  -H "Content-Type: application/json"
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "Order Management Microservice is running",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

---

## 👥 2. USER MANAGEMENT SERVICE (Customer APIs)

### 🆕 Crear Cliente
```bash
curl -X POST "http://localhost:8080/api/customer/createcustomer" \
  -H "Content-Type: application/json" \
  -d '{
    "document": "12345678",
    "firstname": "Juan",
    "lastname": "Pérez",
    "address": "Calle 123 #45-67",
    "phone": "+57 300 123 4567",
    "email": "juan.perez@email.com"
  }'
```

**Respuesta esperada (éxito):**
```json
{
  "createCustomerValid": true,
  "message": "Customer created successfully",
  "customer_id": 1
}
```

### 🔍 Buscar Cliente por ID
```bash
curl -X GET "http://localhost:8080/api/customer/findcustomerbyid/1" \
  -H "Content-Type: application/json"
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "document": "12345678",
  "firstname": "Juan",
  "lastname": "Pérez",
  "address": "Calle 123 #45-67",
  "phone": "+57 300 123 4567",
  "email": "juan.perez@email.com"
}
```

### ✏️ Actualizar Cliente
```bash
curl -X PUT "http://localhost:8080/api/customer/updateCustomer/1" \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Juan Carlos",
    "phone": "+57 300 999 8888",
    "address": "Nueva Dirección 456"
  }'
```

---

## 📦 3. ORDER MANAGEMENT SERVICE

### 🆕 Crear Pedido
```bash
curl -X POST "http://localhost:8080/api/order/createorder" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "items": [
      {
        "productId": "PROD001",
        "productName": "Laptop HP",
        "quantity": 1,
        "unitPrice": 1500.00
      },
      {
        "productId": "PROD002", 
        "productName": "Mouse Inalámbrico",
        "quantity": 2,
        "unitPrice": 25.00
      }
    ]
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "ORDER_ID_GENERADO"
}
```

### 🔍 Buscar Pedidos por Customer ID
```bash
curl -X POST "http://localhost:8080/api/order/findorderbycustomerid" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1
  }'
```

### 🔄 Actualizar Estado del Pedido
```bash
curl -X POST "http://localhost:8080/api/order/updateorderstatus" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_ID_AQUI",
    "status": "SHIPPED"
  }'
```

---

## 🧪 4. SCRIPT DE PRUEBAS AUTOMATIZADAS

Crea un archivo `test-all-endpoints.bat` para probar todo automáticamente:

```batch
@echo off
echo ==========================================
echo PRUEBAS COMPLETAS DE MICROSERVICIOS
echo ==========================================

echo.
echo 1. Verificando Health Checks...
echo ================================
curl -X GET "http://localhost:8080/api/user-health"
echo.
curl -X GET "http://localhost:8080/api/order-health"
echo.

echo.
echo 2. Creando cliente de prueba...
echo ===============================
curl -X POST "http://localhost:8080/api/customer/createcustomer" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\":\"87654321\",\"firstname\":\"María\",\"lastname\":\"García\",\"address\":\"Carrera 7 #12-34\",\"phone\":\"+57 310 555 1234\",\"email\":\"maria.garcia@test.com\"}"
echo.

echo.
echo 3. Consultando cliente creado...
echo ================================
curl -X GET "http://localhost:8080/api/customer/findcustomerbyid/1"
echo.

echo.
echo 4. Creando pedido de prueba...
echo ==============================
curl -X POST "http://localhost:8080/api/order/createorder" ^
  -H "Content-Type: application/json" ^
  -d "{\"customerId\":1,\"items\":[{\"productId\":\"TEST001\",\"productName\":\"Producto Test\",\"quantity\":1,\"unitPrice\":100.00}]}"
echo.

echo.
echo 5. Consultando pedidos del cliente...
echo ====================================
curl -X POST "http://localhost:8080/api/order/findorderbycustomerid" ^
  -H "Content-Type: application/json" ^
  -d "{\"customerId\":1}"
echo.

pause
```

---

## 🔧 5. TROUBLESHOOTING

### Verificar estado de servicios:
```bash
docker-compose ps
```

### Ver logs si hay problemas:
```bash
# Logs del API Gateway
docker-compose logs api-gateway

# Logs del User Service
docker-compose logs user-service  

# Logs del Order Service
docker-compose logs order-service

# Logs de Eureka
docker-compose logs eureka-server
```

### Verificar registro en Eureka:
```bash
# Abrir en el navegador
http://localhost:8761/
```

### Verificar rutas del API Gateway:
```bash
curl http://localhost:8080/actuator/gateway/routes
```

---

## 📊 6. CÓDIGOS DE ESTADO ESPERADOS

| Endpoint | Método | Código Éxito | Código Error |
|----------|--------|--------------|--------------|
| Health Checks | GET | 200 | 500 |
| Create Customer | POST | 200 | 400, 500 |
| Find Customer | GET | 200 | 404, 500 |
| Update Customer | PUT | 200 | 400, 404, 500 |
| Create Order | POST | 200 | 400, 500 |
| Find Orders | POST | 200 | 404, 500 |
| Update Order Status | POST | 200 | 400, 404, 500 |

---

## 💡 NOTAS IMPORTANTES

1. **Orden de pruebas:** Siempre crear cliente antes que pedidos
2. **IDs automáticos:** Los IDs se generan automáticamente
3. **Timeouts:** Los servicios pueden tardar en estar listos (60-90 segundos)
4. **Puertos:**
   - API Gateway: 8080
   - User Service directo: 8000  
   - Order Service directo: 3000
   - Eureka: 8761

5. **Base de datos:** 
   - MySQL (User Service): Puerto 3307
   - MongoDB (Order Service): Puerto 27017