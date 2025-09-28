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
docker-compose build --no-cache user-service
docker-compose up --build

pause