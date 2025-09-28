@echo off
echo ==========================================
echo LIMPIEZA DE DOCKER - Liberar Espacio
echo ==========================================

echo.
echo Verificando uso actual de espacio...
echo ====================================
docker system df

echo.
echo 1. Limpiando contenedores parados...
echo ====================================
docker container prune -f

echo.
echo 2. Limpiando imagenes sin usar...
echo =================================
docker image prune -f

echo.
echo 3. Limpiando redes sin usar...
echo ==============================
docker network prune -f

echo.
echo 4. Limpiando cache de build...
echo ==============================
docker builder prune -f

echo.
echo ESPACIO LIBERADO:
echo =================
echo ANTES:
echo %BEFORE_CLEANUP%
echo.
echo DESPUES:
docker system df

echo.
echo ==========================================
echo LIMPIEZA COMPLETADA
echo 
echo COMANDO NUCLEAR (usar solo si necesitas mucho espacio):
echo docker system prune -a -f --volumes
echo (¡CUIDADO! Borra TODAS las imagenes no usadas)
echo ==========================================
pause