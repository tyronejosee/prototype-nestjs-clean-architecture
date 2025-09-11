# Prototype NestJS & Clean Architecture

A production-ready NestJS module implementing a Catalog system using **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

## 🚀 Features

- **Clean Architecture** with proper layer separation
- **Domain-Driven Design** principles
- **SOLID** principles implementation
- **Dependency Inversion** using interfaces
- **TypeORM** integration with PostgreSQL
- **Swagger/OpenAPI** documentation
- **Docker** containerization
- **Input Validation** with class-validator
- **Production-ready** configuration

## ✅ Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (if running locally)

## ⚙️ Installation

Clone the repository.

```bash
git clone <repository>
cd nestjs-catalog-clean-architecture
```

Install dependencies (local).

```bash
npm install
```

Run Locally (Alternative).

```bash
# Ensure PostgreSQL is running and configured
npm run start:dev
```

Copy the environment file and edit it with your configuration.

```bash
cp .env.example .env
> Edit .env with your configuration
```

Start all services with Docker Compose.

```bash
docker-compose up -d
```

View logs.

```bash
docker-compose logs -f app
```

## Access the Application

- **API**: <http://localhost:3000/api>
- **Swagger Documentation**: <http://localhost:3000/api/docs>

## 🐳 Docker Configuration

The project includes multi-stage Docker builds:

- **Development**: `docker-compose up` with hot-reload
- **Production**: Optimized image with security best practices

Services included:

- **App**: NestJS application
- **PostgreSQL**: Database
- **Redis**: Caching (optional)

## 🚀 Production Deployment

The application is production-ready with:

- **Multi-stage Docker builds**
- **Health checks**
- **Environment-based configuration**
- **Database migrations**
- **Logging**
- **Error monitoring ready**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## ⚖️ License

This project is under the [MIT Licence](LICENCE.md).
