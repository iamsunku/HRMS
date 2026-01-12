# Backend Guide (Mongoose + Next.js)

This project uses **Next.js API Routes** (running on Node.js) with **Mongoose** to connect to MongoDB.

## Architecture
- **Database**: MongoDB
- **ORM/ODM**: Mongoose
- **API Runtime**: Node.js (via Next.js App Router)

## Directory Structure
- `src/lib/db.ts`: Handles the database connection (caching it for development).
- `src/models/`: Contains Mongoose schemas/models (User, Employee, etc.).
- `src/app/api/`: Contains the API endpoints.

## Setup
1. Ensure your `.env` file has the `MONGODB_URI` variable set:
   ```env
   MONGODB_URI="your_mongodb_connection_string"
   ```

## Creating new APIs
To create a new API route:
1. Create a folder in `src/app/api/` (e.g., `src/app/api/projects`).
2. Create a `route.ts` file inside it.
3. Import `dbConnect` from `@/lib/db` and your models.
4. Export `GET`, `POST`, `PUT`, etc., functions.

Example:
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  await dbConnect();
  const projects = await Project.find({});
  return NextResponse.json({ data: projects });
}
```
