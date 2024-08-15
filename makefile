start-local:
	@echo "🏡 Local development 🏡"
	@(sleep 10 && open http://localhost:3000/) &
	@docker compose -f ./infrastructure/docker-compose.yml up --build
	@echo "✨ Done ✨"