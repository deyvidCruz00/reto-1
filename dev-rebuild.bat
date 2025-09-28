@echo off
echo ==========================================
echo DESARROLLO RAPIDO - Cambios de Codigo
echo ==========================================

if "%1"=="" (
    echo Usage: dev-rebuild.bat [service]
    echo.
    echo Servicios disponibles:
    echo   user-service    - User Management Python
    echo   order-service   - Order Management Node.js  
    echo   api-gateway     - API Gateway Java
    echo   eureka-server   - Eureka Server Java
    echo.
    echo Ejemplo: dev-rebuild.bat user-service
    pause
    exit /b 1
)

set SERVICE=%1

echo.
echo 1. Rebuilding %SERVICE%...
echo ===========================
docker-compose build %SERVICE%
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed for %SERVICE%
    pause
    exit /b 1
)

echo.
echo 2. Restarting %SERVICE%...
echo ==========================
docker-compose up -d --no-deps %SERVICE%

echo.
echo 3. Verificando logs (10 segundos)...
echo ====================================
timeout /t 2 /nobreak
docker logs --tail 10 -f %SERVICE% 2>&1 | timeout /t 8

echo.
echo 4. Estado del servicio...
echo =========================
docker-compose ps %SERVICE%

echo.
echo ==========================================
echo %SERVICE% actualizado correctamente
echo 
echo Para ver logs completos: docker logs %SERVICE%
echo Para limpiar espacio: docker system prune -f
echo ==========================================