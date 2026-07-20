# Marketplace API - Seller Authentication

## Description

This project implements the Seller Authentication module for a Marketplace API using NestJS.

## Technologies

- NestJS
- Prisma ORM
- MySQL
- JWT Authentication
- Bcrypt
- Class Validator

## Features

- Seller Registration
- Seller Login
- Seller Logout
- JWT Authentication
- Password Hashing
- Input Validation

## API Endpoints

### Register

POST /api/v1/sellers/register

### Login

POST /api/v1/sellers/login

### Logout

POST /api/v1/sellers/logout

## Installation

```bash
npm install
```

Configure the `.env` file.

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run start:dev
```

## Author

Hassan Elhajjam