@echo off
echo ==========================================
echo DIAGNOSTICO DE CONEXION MYSQL
echo ==========================================

echo.
echo 1. Verificando estado de contenedores...
echo ========================================
docker ps --filter "name=mysql-db" --filter "name=user-management-service" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo 2. Verificando salud de MySQL...
echo ================================
docker exec mysql-db mysqladmin ping -u root -prootpass
if %ERRORLEVEL% neq 0 (
    echo ❌ MySQL no responde a ping
) else (
    echo ✅ MySQL responde correctamente
)

echo.
echo 3. Verificando base de datos y usuario...
echo =========================================
docker exec mysql-db mysql -u root -prootpass -e "SHOW DATABASES; SELECT User, Host FROM mysql.user WHERE User='fastapi';"

echo.
echo 4. Probando conexion desde contenedor de usuario...
echo ==================================================
docker exec user-management-service ping -c 3 mysql-db
if %ERRORLEVEL% neq 0 (
    echo ❌ No hay conectividad de red entre contenedores
) else (
    echo ✅ Conectividad de red OK
)

echo.
echo 5. Verificando variables de entorno del user service...
echo =======================================================
docker exec user-management-service printenv | findstr DB_

echo.
echo 6. Probando conexion directa con mysql client...
echo ================================================
docker exec user-management-service sh -c "echo 'SELECT 1;' | mysql -h mysql -u fastapi -pfastapipass usermgmt_db"
if %ERRORLEVEL% neq 0 (
    echo ❌ Conexion MySQL directa fallo
) else (
    echo ✅ Conexion MySQL directa exitosa
)

echo.
echo 7. Verificando logs recientes del user service...
echo =================================================
docker logs --tail 10 user-management-service

echo.
echo 8. Verificando logs recientes de MySQL...
echo =========================================
docker logs --tail 10 mysql-db

echo.
echo ==========================================
echo DIAGNOSTICO COMPLETADO
echo ==========================================

echo.
echo POSIBLES SOLUCIONES:
echo 1. Si MySQL no responde: docker-compose restart mysql
echo 2. Si no hay conectividad: Verificar network en docker-compose
echo 3. Si usuario no existe: Verificar init.sql se ejecuto correctamente
echo 4. Si variables incorrectas: Verificar docker-compose.yml

pause