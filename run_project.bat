@echo off
echo 🏡 Local development 🏡

timeout /t 10 /nobreak >nul
start http://localhost:3000/

docker compose -f ./infrastructure/docker-compose.yml up --build

echo ✨ Done ✨
pause