@echo off
echo Compilando servicios Spring Boot...

echo.
echo =================================
echo Compilando Eureka Server...
echo =================================
cd eureka-server
call mvn clean package -DskipTests
if %ERRORLEVEL% neq 0 (
    echo Error al compilar Eureka Server
    pause
    exit /b 1
)

echo.
echo =================================
echo Compilando API Gateway...
echo =================================
cd ../api-gateway
call mvn clean package -DskipTests
if %ERRORLEVEL% neq 0 (
    echo Error al compilar API Gateway
    pause
    exit /b 1
)

echo.
echo =================================
echo Compilacion completada exitosamente
echo =================================
cd ..

echo.
echo =================================
echo Levantando servicios con Docker Compose...
echo =================================
echo Rebuilding images to include fixes...

REM build only user-service image (mantener tu lógica original)
docker-compose build --no-cache user-service

REM Start only MySQL first (detached)
echo Iniciando MySQL...
docker-compose up -d mysql

REM Esperar a que MySQL responda (usa mysqladmin dentro del contenedor)
echo Esperando a que MySQL esté listo...
:wait_mysql
docker-compose exec mysql mysqladmin ping -uroot -prootpass >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo MySQL no listo, esperando 3s...
    timeout /t 3 /nobreak >nul
    goto wait_mysql
)
echo MySQL listo.

REM Ahora levantar el resto (reconstruir/arrancar servicios)
docker-compose up --build

pause