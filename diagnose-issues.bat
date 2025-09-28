@echo off
echo ==========================================
echo DIAGNOSTICO DE PROBLEMAS DE BASE DE DATOS
echo ==========================================

echo.
echo 1. Verificando contenedores en ejecucion...
echo ===========================================
docker ps --filter "name=mysql-db" --filter "name=mongo-db" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo 2. Verificando puertos en uso...
echo =================================
netstat -an | findstr :3306
netstat -an | findstr :3307
netstat -an | findstr :27017

echo.
echo 3. Verificando logs de MySQL...
echo ==============================
echo Ultimas 10 lineas de logs de MySQL:
docker logs --tail 10 mysql-db

echo.
echo 4. Verificando logs de MongoDB...
echo ================================
echo Ultimas 10 lineas de logs de MongoDB:
docker logs --tail 10 mongo-db

echo.
echo 5. Probando conexion directa a MySQL...
echo =======================================
docker exec mysql-db mysqladmin ping -u root -prootpass

echo.
echo 6. Probando conexion directa a MongoDB...
echo =========================================
docker exec mongo-db mongosh --eval "db.runCommand('ping')" --quiet

echo.
echo 7. Verificando health de microservicios...
echo ==========================================
echo User Service:
curl -s -w "Status: %%{http_code}\n" http://localhost:8000/health

echo Order Service:
curl -s -w "Status: %%{http_code}\n" http://localhost:3000/health

echo.
echo 8. Verificando variables de entorno (User Service)...
echo ====================================================
docker exec user-management-service printenv | findstr DB_

echo.
echo 9. Verificando variables de entorno (Order Service)...
echo ======================================================
docker exec order-management-service printenv | findstr MONGO

echo.
echo ==========================================
echo DIAGNOSTICO COMPLETADO
echo ==========================================
pause