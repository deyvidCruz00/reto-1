# Scripts de Construcción y Despliegue

## build.bat - Script para Windows
```batch
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
echo Compilación completada exitosamente
echo =================================
cd ..

echo.
echo =================================
echo Levantando servicios con Docker Compose...
echo =================================
docker-compose up --build

pause
```

## build.sh - Script para Linux/Mac
```bash
#!/bin/bash

echo "Compilando servicios Spring Boot..."

echo ""
echo "================================="
echo "Compilando Eureka Server..."
echo "================================="
cd eureka-server
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "Error al compilar Eureka Server"
    exit 1
fi

echo ""
echo "================================="
echo "Compilando API Gateway..."
echo "================================="
cd ../api-gateway
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "Error al compilar API Gateway"
    exit 1
fi

echo ""
echo "================================="
echo "Compilación completada exitosamente"
echo "================================="
cd ..

echo ""
echo "================================="
echo "Levantando servicios con Docker Compose..."
echo "================================="
docker-compose up --build
```