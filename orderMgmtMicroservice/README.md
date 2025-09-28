# Order Management Microservice

Microservicio de manejo de pedidos desarrollado con Express.js, JavaScript y MongoDB utilizando arquitectura DTO para la interconexión ORM.

## Características

- Crear pedidos
- Modificar estado del pedido ("Received", "In progress", "Sended")
- Buscar pedidos por ID de cliente
- Arquitectura DTO para separación de capas
- Base de datos NoSQL MongoDB
- Validación de datos
- Manejo de errores

## Tecnologías

- Node.js
- Express.js
- MongoDB con Mongoose
- Arquitectura DTO
- CORS habilitado

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar `.env` con tu configuración de MongoDB.

3. Asegurarse de que MongoDB esté ejecutándose localmente o configurar la URI de conexión.

## Uso

### Iniciar el servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### Endpoints disponibles

#### 1. Crear Pedido
- **URL:** `POST /order/createorder`
- **Parámetros:**
  ```json
  {
    "customerid": "string",
    "orderID": "string", 
    "status": "string" (opcional, por defecto: "Received")
  }
  ```
- **Respuesta:**
  ```json
  {
    "orderCreated": boolean
  }
  ```

#### 2. Actualizar Estado del Pedido
- **URL:** `POST /order/updateorderstatus`
- **Parámetros:**
  ```json
  {
    "orderID": "string",
    "status": "string" ("Received", "In progress", "Sended")
  }
  ```
- **Respuesta:**
  ```json
  {
    "orderStatusUpdated": boolean
  }
  ```

#### 3. Buscar Pedidos por ID de Cliente
- **URL:** `POST /order/findorderbycustomerid`
- **Parámetros:**
  ```json
  {
    "customerid": "string"
  }
  ```
- **Respuesta:**
  ```json
  [
    {
      "customerID": "string",
      "orderID": "string",
      "status": "string"
    }
  ]
  ```

#### 4. Health Check
- **URL:** `GET /health`
- **Respuesta:**
  ```json
  {
    "status": "OK",
    "message": "Order Management Microservice is running",
    "timestamp": "ISO Date"
  }
  ```

## Estructura del Proyecto

```
orderMgmtMicroservice/
├── app.js                 # Archivo principal del servidor
├── package.json          # Dependencias y scripts
├── .env                  # Variables de entorno
├── src/
│   ├── config/
│   │   └── database.js   # Configuración de MongoDB
│   ├── controllers/
│   │   └── OrderController.js  # Controladores REST
│   ├── dto/
│   │   ├── CreateOrderDto.js      # DTO para crear pedidos
│   │   ├── UpdateOrderStatusDto.js # DTO para actualizar estado
│   │   └── OrderResponseDto.js     # DTO de respuesta
│   ├── models/
│   │   └── Order.js      # Modelo de datos de MongoDB
│   ├── routes/
│   │   └── orderRoutes.js # Definición de rutas
│   └── services/
│       └── OrderService.js # Lógica de negocio
```

## Modelo de Datos

La colección `Order` contiene los siguientes campos:

- `customerID`: String (requerido) - ID del cliente
- `orderID`: String (requerido, único) - ID único del pedido
- `status`: String (requerido) - Estado del pedido: "Received", "In progress", "Sended"
- `timestamps`: Automático - Fecha de creación y actualización

## Ejemplos de Uso

### Crear un pedido
```bash
curl -X POST http://localhost:3000/order/createorder \
  -H "Content-Type: application/json" \
  -d '{"customerid":"CUST001","orderID":"ORD001","status":"Received"}'
```

### Actualizar estado de pedido
```bash
curl -X POST http://localhost:3000/order/updateorderstatus \
  -H "Content-Type: application/json" \
  -d '{"orderID":"ORD001","status":"In progress"}'
```

### Buscar pedidos por cliente
```bash
curl -X POST http://localhost:3000/order/findorderbycustomerid \
  -H "Content-Type: application/json" \
  -d '{"customerid":"CUST001"}'
```