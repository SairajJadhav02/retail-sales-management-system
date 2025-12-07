# retail-sales-management-system
A Retail Sales Management System is a comprehensive software solution designed to streamline and automate the core operations of retail businesses. It enables retailers to efficiently manage product inventory, customer information, sales transactions, billing, and reporting within a centralized platform.
## Overview
A full-stack web application for managing retail sales transactions with advanced search, multi-select filtering, sorting, and pagination capabilities. Built with React frontend and Node.js backend following clean architecture principles.

## Tech Stack
**Frontend:** React 18, Tailwind CSS, Lucide Icons, Axios
**Backend:** Node.js, Express.js, MongoDB/PostgreSQL
**Tools:** Vite, ESLint, Git

## Search Implementation Summary
Implemented case-insensitive full-text search across Customer Name and Phone Number fields using regex pattern matching on the backend. Search query is debounced on frontend and works seamlessly with active filters and sorting states.

## Filter Implementation Summary
Multi-select filters implemented for Region, Gender, Category, Tags, and Payment Methods using checkbox groups. Range-based filters for Age and Date ranges. All filters work independently and in combination, maintaining state through MongoDB aggregation pipeline queries.

## Sorting Implementation Summary
Sorting implemented for Date (newest/oldest first), Quantity (high/low), and Customer Name (A-Z/Z-A) using MongoDB sort operations. Sorting preserves all active search and filter states through query parameter management.

## Pagination Implementation Summary
Server-side pagination with 10 items per page implemented using skip/limit operations. Navigation includes Previous/Next buttons with disabled states at boundaries. Page state is maintained across all filter, search, and sort operations.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB/PostgreSQL installed locally or cloud instance
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure database connection in .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` in backend directory:
```
PORT=5000
DATABASE_URL=your_database_connection_string
NODE_ENV=development
```

Access the application at `http://localhost:5173`
