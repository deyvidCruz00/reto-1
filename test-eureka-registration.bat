@echo off
echo ==========================================
echo TESTING EUREKA REGISTRATION
echo ==========================================

echo.
echo 1. Verificando que Eureka Server este corriendo...
echo =================================================
curl -s http://localhost:8761/actuator/health
if %ERRORLEVEL% neq 0 (
    echo ❌ Eureka Server no esta disponible
    echo    Asegurate de ejecutar: docker-compose up -d eureka-server
    pause
    exit /b 1
)

echo.
echo ✅ Eureka Server esta corriendo

echo.
echo 2. Esperando 10 segundos para que los servicios se registren...
echo =============================================================
timeout /t 10 /nobreak

echo.
echo 3. Verificando servicios registrados en Eureka...
echo =================================================
curl -s http://localhost:8761/eureka/apps | findstr /i "user-management-service"
if %ERRORLEVEL% equ 0 (
    echo ✅ User Management Service registrado correctamente
) else (
    echo ⚠️  User Management Service no encontrado en Eureka
)

curl -s http://localhost:8761/eureka/apps | findstr /i "order-management-service"
if %ERRORLEVEL% equ 0 (
    echo ✅ Order Management Service registrado correctamente
) else (
    echo ⚠️  Order Management Service no encontrado en Eureka
)

echo.
echo 4. Probando endpoints de health a traves de API Gateway...
echo ==========================================================
echo Testing User Service via Gateway:
curl -s http://localhost:8080/api/user-health
echo.

echo Testing Order Service via Gateway:
curl -s http://localhost:8080/api/order-health
echo.

echo.
echo 5. Verificando logs recientes de los servicios...
echo =================================================
echo User Service logs (ultimas 5 lineas):
docker logs --tail 5 user-management-service 2>&1 | findstr /i "eureka"

echo.
echo Order Service logs (ultimas 5 lineas):
docker logs --tail 5 order-management-service 2>&1 | findstr /i "eureka"

echo.
echo ==========================================
echo TESTING COMPLETADO
echo ==========================================
pause