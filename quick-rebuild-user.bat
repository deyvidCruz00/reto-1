@echo off
echo ==========================================
echo REBUILD RAPIDO - Solo User Service
echo ==========================================

echo.
echo 1. Parar User Service si esta corriendo...
echo ==========================================
docker-compose stop user-service
docker container rm user-management-service 2>nul

echo.
echo 2. Rebuild User Service con Dockerfile corregido...
echo ==================================================
docker-compose build --no-cache user-service
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed - revisar Dockerfile
    pause
    exit /b 1
)

echo ✅ User Service rebuilt successfully

echo.
echo 3. Levantar User Service...
echo ===========================
docker-compose up -d user-service

echo.
echo 4. Monitorear logs por 20 segundos...
echo =====================================
timeout /t 3 /nobreak
echo Logs del User Service:
docker logs -f user-management-service 2>&1 | timeout /t 17

echo.
echo 5. Verificar estado final...
echo ============================
docker ps --filter "name=user-management-service" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo 6. Test health endpoint...
echo ==========================
timeout /t 2 /nobreak
curl -s http://localhost:8000/health
echo.

echo.
echo ==========================================
echo REBUILD COMPLETADO
echo Para logs completos: docker logs user-management-service
echo Para debug: curl http://localhost:8000/debug
echo ==========================================
pause