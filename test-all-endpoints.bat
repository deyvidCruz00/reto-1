@echo off
echo ==========================================
echo PRUEBAS COMPLETAS DE MICROSERVICIOS
echo ==========================================

echo.
echo Verificando que los servicios esten levantados...
echo =================================================
docker-compose ps

echo.
echo 1. Verificando Health Checks...
echo ================================
echo Testing User Service Health:
curl -s -X GET "http://localhost:8080/api/user-health"
echo.
echo.
echo Testing Order Service Health:
curl -s -X GET "http://localhost:8080/api/order-health"
echo.

echo.
echo 2. Creando cliente de prueba...
echo ===============================
curl -s -X POST "http://localhost:8080/api/customer/createcustomer" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\":\"87654321\",\"firstname\":\"Maria\",\"lastname\":\"Garcia\",\"address\":\"Carrera 7 #12-34\",\"phone\":\"+57 310 555 1234\",\"email\":\"maria.garcia@test.com\"}"
echo.

echo.
echo 3. Consultando cliente creado (ID: 1)...
echo ========================================
curl -s -X GET "http://localhost:8080/api/customer/findcustomerbyid/1"
echo.

echo.
echo 4. Actualizando cliente...
echo ==========================
curl -s -X PUT "http://localhost:8080/api/customer/updateCustomer/1" ^
  -H "Content-Type: application/json" ^
  -d "{\"firstname\":\"Maria Elena\",\"phone\":\"+57 310 999 8888\"}"
echo.

echo.
echo 5. Verificando actualizacion del cliente...
echo ===========================================
curl -s -X GET "http://localhost:8080/api/customer/findcustomerbyid/1"
echo.

echo.
echo 6. Creando pedido de prueba...
echo ==============================
curl -s -X POST "http://localhost:8080/api/order/createorder" ^
  -H "Content-Type: application/json" ^
  -d "{\"customerId\":1,\"items\":[{\"productId\":\"TEST001\",\"productName\":\"Laptop Test\",\"quantity\":1,\"unitPrice\":1200.00},{\"productId\":\"TEST002\",\"productName\":\"Mouse Test\",\"quantity\":2,\"unitPrice\":25.50}]}"
echo.

echo.
echo 7. Consultando pedidos del cliente...
echo ====================================
curl -s -X POST "http://localhost:8080/api/order/findorderbycustomerid" ^
  -H "Content-Type: application/json" ^
  -d "{\"customerId\":1}"
echo.

echo.
echo 8. Creando segundo cliente...
echo =============================
curl -s -X POST "http://localhost:8080/api/customer/createcustomer" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\":\"11223344\",\"firstname\":\"Carlos\",\"lastname\":\"Rodriguez\",\"address\":\"Avenida 68 #45-12\",\"phone\":\"+57 320 777 9999\",\"email\":\"carlos.rodriguez@test.com\"}"
echo.

echo.
echo 9. Probando cliente no existente (ID: 999)...
echo =============================================
curl -s -X GET "http://localhost:8080/api/customer/findcustomerbyid/999"
echo.

echo.
echo ==========================================
echo PRUEBAS COMPLETADAS
echo ==========================================
echo.
echo Para mas pruebas manuales, consulta API-TESTING-GUIDE.md
echo Para ver la documentacion Swagger: http://localhost:8000/docs
echo Para ver Eureka Dashboard: http://localhost:8761/
echo.
pause