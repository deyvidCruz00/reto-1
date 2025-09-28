# 📋 Pruebas con Postman - Microservicio de Pedidos

Esta guía te muestra cómo probar todos los endpoints del microservicio de pedidos usando Postman.

## 🚀 Configuración Inicial

### 1. Asegurar que los servicios estén ejecutándose

1. **MongoDB con Docker:**
```bash
docker-compose up -d mongodb
```

2. **Microservicio:**
```bash
node app.js
```

### 2. Verificar el estado
- MongoDB: `docker ps` (debería mostrar `orderdb_mongodb`)
- Microservicio: Debería mostrar "Order Management Microservice running on port 3000"

---

## 📝 Endpoints para Probar en Postman

### 🔸 **1. Health Check**
**Verifica que el microservicio esté funcionando**

- **Método:** GET
- **URL:** `http://localhost:3000/health`
- **Headers:** No necesarios
- **Body:** No necesario

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "Order Management Microservice is running",
  "timestamp": "2025-09-27T19:30:00.000Z"
}
```

---

### 🔸 **2. Crear Pedido**
**Crea una nueva orden en el sistema**

- **Método:** POST
- **URL:** `http://localhost:3000/order/createorder`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "customerid": "CUST005",
  "orderID": "ORD005",
  "status": "Received"
}
```

**Respuesta esperada (éxito):**
```json
{
  "orderCreated": true
}
```

**Respuesta esperada (error - ID duplicado):**
```json
{
  "error": "Order ID already exists",
  "orderCreated": false
}
```

---

### 🔸 **3. Actualizar Estado del Pedido**
**Modifica el estado de una orden existente**

- **Método:** POST
- **URL:** `http://localhost:3000/order/updateorderstatus`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "orderID": "ORD001",
  "status": "In progress"
}
```

**Respuesta esperada (éxito):**
```json
{
  "orderStatusUpdated": true
}
```

**Respuesta esperada (error - orden no encontrada):**
```json
{
  "error": "Order not found",
  "orderStatusUpdated": false
}
```

---

### 🔸 **4. Buscar Pedidos por Cliente**
**Obtiene todas las órdenes de un cliente específico**

- **Método:** POST
- **URL:** `http://localhost:3000/order/findorderbycustomerid`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "customerid": "CUST001"
}
```

**Respuesta esperada:**
```json
[
  {
    "customerID": "CUST001",
    "orderID": "ORD001",
    "status": "In progress"
  },
  {
    "customerID": "CUST001",
    "orderID": "ORD002",
    "status": "In progress"
  }
]
```

---

## 🧪 Casos de Prueba Sugeridos

### Test Case 1: Flujo Completo de Orden
1. **Health Check** - Verificar que el servicio esté disponible
2. **Crear orden** - Crear orden "ORD100" para "CUST100"
3. **Buscar por cliente** - Verificar que la orden aparezca
4. **Actualizar estado** - Cambiar a "In progress"
5. **Buscar por cliente** - Verificar el cambio de estado
6. **Actualizar estado** - Cambiar a "Sended"
7. **Buscar por cliente** - Verificar estado final

### Test Case 2: Validaciones y Errores
1. **Crear orden sin datos** - Body vacío
2. **Crear orden con ID duplicado** - Usar ID existente
3. **Actualizar orden inexistente** - OrderID que no existe
4. **Estados inválidos** - Usar status no permitido
5. **Buscar cliente inexistente** - CustomerID que no existe

### Test Case 3: Datos de Ejemplo Incluidos
Puedes probar con los datos que ya están en la base de datos:
- `CUST001`: tiene órdenes `ORD001`, `ORD002`
- `CUST002`: tiene orden `ORD003`
- `CUST003`: tiene orden `ORD004`

---

## 📊 Datos de Prueba Sugeridos

### Para Crear Órdenes Nuevas:
```json
{"customerid": "CUST005", "orderID": "ORD005", "status": "Received"}
{"customerid": "CUST006", "orderID": "ORD006", "status": "In progress"}
{"customerid": "CUST001", "orderID": "ORD007", "status": "Received"}
```

### Para Actualizar Estados:
```json
{"orderID": "ORD001", "status": "In progress"}
{"orderID": "ORD002", "status": "Sended"}
{"orderID": "ORD005", "status": "Sended"}
```

### Para Buscar por Cliente:
```json
{"customerid": "CUST001"}
{"customerid": "CUST002"}
{"customerid": "CUST005"}
```

---

## ⚠️ Troubleshooting

### Error: "Cannot connect to server"
- Verificar que el microservicio esté ejecutándose: `node app.js`
- Verificar el puerto: debería mostrar "running on port 3000"

### Error: "Database connection error"
- Verificar que MongoDB esté ejecutándose: `docker ps`
- Verificar logs: `docker-compose logs mongodb`

### Error: "Order ID already exists"
- Cambiar el `orderID` por uno nuevo
- Verificar órdenes existentes con el endpoint de búsqueda

### Error: "Order not found"
- Verificar que el `orderID` exista usando búsqueda por cliente
- Comprobar la escritura exacta del ID

---

## 📱 Configuración de Postman Environment

Puedes crear un Environment en Postman con estas variables:
- `baseUrl`: `http://localhost:3000`
- `newCustomerId`: `CUST005`
- `newOrderId`: `ORD005`
- `existingCustomerId`: `CUST001`
- `existingOrderId`: `ORD001`

Esto te permitirá usar `{{baseUrl}}/health` en lugar de escribir la URL completa.