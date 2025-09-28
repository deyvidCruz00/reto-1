@echo off
echo ==========================================
echo SOLUCION PASO A PASO - PROBLEMA MYSQL
echo ==========================================

echo.
echo PASO 1: Parar servicios actuales
echo =================================
docker-compose down
echo ✅ Servicios parados

echo.
echo PASO 2: Levantar solo MySQL primero
echo ====================================
docker-compose up -d mysql
echo 🔄 MySQL iniciando...

echo.
echo PASO 3: Esperar que MySQL este completamente listo (60 segundos)
echo ===============================================================
echo Esperando MySQL...
timeout /t 60 /nobreak

echo.
echo PASO 4: Verificar salud de MySQL
echo ================================
docker exec mysql-db mysqladmin ping -u root -prootpass
if %ERRORLEVEL% neq 0 (
    echo ❌ MySQL no responde - revisar logs
    docker logs mysql-db
    pause
    exit /b 1
) else (
    echo ✅ MySQL esta respondiendo
)

echo.
echo PASO 5: Verificar base de datos y usuario
echo =========================================
docker exec mysql-db mysql -u root -prootpass -e "SHOW DATABASES; SELECT User FROM mysql.user WHERE User='fastapi';"

echo.
echo PASO 6: Rebuild User Service con cambios
echo ========================================
docker-compose build --no-cache user-service
echo ✅ User service rebuilt

echo.
echo PASO 7: Levantar User Service
echo =============================
docker-compose up -d user-service
echo 🔄 User service iniciando...

echo.
echo PASO 8: Monitorear logs del User Service por 30 segundos
echo ========================================================
timeout /t 5 /nobreak
docker logs -f --tail 20 user-management-service &
timeout /t 25 /nobreak

echo.
echo PASO 9: Verificar estado final
echo ==============================
docker ps --filter "name=mysql-db" --filter "name=user-management-service"

echo.
echo PASO 10: Probar health endpoint
echo ===============================
curl -s http://localhost:8000/health

echo.
echo ==========================================
echo Si el User Service aun no conecta:
echo 1. Ejecutar: diagnose-mysql.bat
echo 2. Verificar logs: docker logs user-management-service
echo 3. Verificar network: docker network ls
echo ==========================================
pause