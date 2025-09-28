@echo off
echo ==========================================
echo BUILD SIMPLIFICADO - Solo lo necesario
echo ==========================================

echo.
echo 1. Compilando Eureka Server...
echo ==============================
cd eureka-server
call mvn clean package -DskipTests -q
if %ERRORLEVEL% neq 0 (
    echo ❌ Error compilando Eureka Server - intentando continuar...
    cd ..
    goto skip_eureka
) else (
    echo ✅ Eureka Server compilado
)
cd ..

:skip_eureka

echo.
echo 2. Compilando API Gateway...
echo ============================
cd api-gateway
call mvn clean package -DskipTests -q
if %ERRORLEVEL% neq 0 (
    echo ❌ Error compilando API Gateway - intentando continuar...
    cd ..
    goto skip_gateway
) else (
    echo ✅ API Gateway compilado
)
cd ..

:skip_gateway

echo.
echo 3. Parando servicios existentes...
echo ==================================
docker-compose down 2>nul

echo.
echo 4. Levantando solo servicios base primero...
echo ============================================
echo Iniciando bases de datos...
docker-compose up -d mysql mongo

echo Esperando que las bases de datos estén listas (30s)...
timeout /t 30 /nobreak

echo.
echo 5. Levantando servicios de infraestructura...
echo =============================================
docker-compose up -d eureka-server
timeout /t 20 /nobreak

docker-compose up -d api-gateway
timeout /t 10 /nobreak

echo.
echo 6. Levantando microservicios...
echo ===============================
docker-compose up -d order-service user-service

echo.
echo 7. Estado final...
echo ==================
timeout /t 5 /nobreak
docker-compose ps

echo.
echo ==========================================
echo BUILD COMPLETADO
echo 
echo URLs importantes:
echo - Eureka Dashboard: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - User Service: http://localhost:8000
echo - Order Service: http://localhost:3000
echo 
echo Para diagnósticos:
echo - quick-rebuild-user.bat (solo user service)
echo - diagnose-mysql.bat (conexión MySQL)
echo - test-eureka-registration.bat (registro Eureka)
echo ==========================================

pause