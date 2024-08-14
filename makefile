start-local:
	@echo "🏡 Local development 🏡"
	@docker compose -f ./infrastructure/docker-compose.yml up --build
	@echo "✨ Done ✨"