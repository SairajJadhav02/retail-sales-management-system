# Backend - Retail Sales Management System

## Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data processing
- **Routes**: API endpoint definitions
- **Models**: Database schema definitions
- **Utils**: Helper functions and utilities

## API Endpoints
- `GET /api/sales` - Get all sales with filters, search, sort, pagination
- `GET /api/sales/:id` - Get single sale by ID
- `POST /api/sales` - Create new sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

## Running
```bash
npm install
npm run dev
```