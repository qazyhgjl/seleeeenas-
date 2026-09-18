.PHONY: help install migrate seed run-backend run-frontend docker-up docker-down clean

help:
	@echo "Available commands:"
	@echo "  make install      - Install backend and frontend dependencies"
	@echo "  make migrate      - Run Django migrations"
	@echo "  make seed         - Seed database with fantasy weapons and lore"
	@echo "  make run-backend  - Start Django development server"
	@echo "  make run-frontend - Start Vite frontend server"
	@echo "  make docker-up    - Start full stack with Docker Compose"
	@echo "  make docker-down  - Stop Docker Compose stack"

install:
	pip install -r backend/requirements.txt
	cd frontend && npm install

migrate:
	python3 backend/manage.py migrate --settings=config.settings.development

seed:
	python3 backend/seed_armory.py

run-backend:
	python3 backend/manage.py runserver 0.0.0.0:8000 --settings=config.settings.development

run-frontend:
	cd frontend && npm run dev

docker-up:
	docker compose -f infra/docker-compose.yml up --build -d

docker-down:
	docker compose -f infra/docker-compose.yml down
