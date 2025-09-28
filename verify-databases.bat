@echo off
echo ========================================
echo Verificando inicializacion de bases de datos
echo ========================================

echo.
echo Verificando MySQL (User Management Service)...
echo ============================================
docker exec -it mysql-db mysql -u fastapi -pfastapipass usermgmt_db -e "SELECT 'MySQL Connection OK' as status; SELECT COUNT(*) as total_customers FROM customers; SELECT document, firstname, lastname, email FROM customers LIMIT 5;"

echo.
echo Verificando MongoDB (Order Management Service)...
echo ===============================================
docker exec -it mongo-db mongosh -u admin -p admin123 --authenticationDatabase admin --quiet --eval "use orderdb; print('MongoDB Connection OK'); print('Collections:', db.getCollectionNames().join(', ')); print('Sample orders:'); db.orders.find().limit(3).forEach(printjson);"

echo.
echo ========================================
echo Verificacion de health endpoints...
echo ========================================

echo.
echo User Service Health:
curl -s http://localhost:8000/health

echo.
echo Order Service Health:
curl -s http://localhost:3000/health

echo.
echo ========================================
echo Verificacion completada
echo ========================================

pause