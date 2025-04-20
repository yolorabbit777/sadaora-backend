# Profile Feed API

A NestJS backend system that allows users to create and update their profiles and exposes a public feed of user profiles with SQLite data persistence.

## 📝 Overview

This API provides a system for managing user profiles and displaying them in a public feed. Users can create and update their profiles with personal information and interests. The public feed can be filtered by interest and supports pagination for efficient data retrieval.

## 🔧 Tech Stack

- **NestJS**: Progressive Node.js framework for building server-side applications
- **TypeScript**: Superset of JavaScript that adds static typing
- **TypeORM**: ORM for TypeScript and JavaScript
- **SQLite**: Lightweight disk-based database
- **Jest**: JavaScript testing framework

## 📋 Features

- Create new user profiles
- Update existing profiles
- View public feed of all profiles
- Filter feed by interests
- Paginate the feed results
- Get statistics about most common interests

## 🚀 API Endpoints

### Profiles

- `POST /api/profile` - Create a new user profile

  ```json
  {
    "fullName": "Aaron Deak",
    "bio": "Software Developer at Sadaora",
    "profileImageUrl": "https://example.com/aarondeak.jpg",
    "interests": ["React", "NestJS", "NodeJS"]
  }
  ```

- `PUT /api/profile/:id` - Update an existing profile
  ```json
  {
    "bio": "Senior Software Engineer with 10 years experience",
    "interests": ["React", "Next.js", "Nest.js", "TailwindCSS"]
  }
  ```

### Feed

- `GET /api/feed` - Get all profiles with default pagination (10 items per page)
- `GET /api/feed?interest=travel` - Filter feed by interest
- `GET /api/feed?page=2&limit=20` - Custom pagination

### Stats

- `GET /api/stats` - Get top 3 most common interests across all profiles

## 🛠️ Project Structure

```
sadaora-backend/
├── src/
│   ├── main.ts                # Application entry point
│   ├── app.module.ts          # Root module
│   ├── profiles/              # Profiles feature module
│   │   ├── entities/
│   │   │   └── profile.entity.ts
│   │   ├── dto/
│   │   │   ├── create-profile.dto.ts
│   │   │   └── update-profile.dto.ts
│   │   ├── profiles.controller.ts
│   │   ├── profiles.service.ts
│   │   └── profiles.module.ts
│   ├── feed/                  # Feed feature module
│   │   ├── feed.controller.ts
│   │   ├── feed.service.ts
│   │   └── feed.module.ts
│   └── stats/                 # Stats feature module
│       ├── stats.controller.ts
│       ├── stats.service.ts
│       └── stats.module.ts
├── test/                      # Unit tests
│   ├── profiles.controller.spec.ts
│   ├── feed.controller.spec.ts
│   └── stats.controller.spec.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yolorabbit777/sadaora-backend.git
cd sadaora-backend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Testing

Run the test suite with:

```bash
npm test
```

For test coverage report:

```bash
npm run test:cov
```

## 📊 Data Model

### Profile Entity

| Field           | Type     | Description                         |
| --------------- | -------- | ----------------------------------- |
| id              | UUID     | Unique identifier (auto-generated)  |
| fullName        | string   | User's full name                    |
| bio             | string   | User biography or description       |
| profileImageUrl | string   | URL to profile image                |
| interests       | string[] | List of user interests              |
| createdAt       | Date     | Creation timestamp (auto-generated) |
| updatedAt       | Date     | Update timestamp (auto-updated)     |

## 💾 Database

The application uses SQLite for data persistence. The database file `profiles.sqlite` is created automatically in the project root when the application starts. The schema is synchronized automatically based on the entity definitions.

## 🔍 Implementation Details

### SQLite Database

The version uses SQLite with TypeORM for persistence, providing:

- Data durability across application restarts
- Efficient queries with TypeORM
- Schema validation and migration capabilities

### Interest Filtering Implementation

Since SQLite doesn't natively support array operations for the interests field:

1. We first use a LIKE query to find potential matches
2. Then apply a secondary JavaScript filter for exact matching

This ensures accurate filtering while working within SQLite's limitations.

### Pagination Implementation

Feed pagination is implemented with:

- `skip` and `take` parameters in TypeORM queries
- Default values (page=1, limit=10)
- Total count returned for client-side pagination UI

## 🧪 Testing Strategy

The project includes comprehensive unit tests for all controllers and services:

- **Profiles Module**: Tests for creating and updating profiles
- **Feed Module**: Tests for retrieving and filtering profiles
- **Stats Module**: Tests for retrieving interest statistics

Tests use Jest's mocking capabilities to isolate components and verify correct behavior without relying on the database.

## 🔄 CI/CD Considerations

For a production deployment, consider:

1. Setting up GitHub Actions or similar CI/CD pipeline
2. Adding pre-commit hooks for linting and formatting
3. Implementing E2E tests
4. Configuring staging and production environments

## 🚧 Future Improvements

- Authentication and authorization
- User roles and permissions
- Full-text search for profiles
- More sophisticated interest matching
- Move to a more robust database (PostgreSQL, MySQL) for production
- Add caching for frequently accessed data
- Implement rate limiting for API endpoints

## ⏱️ Time Taken

- Project setup: 10 minutes
- Core functionality implementation: 2 hour
- Testing: 30 minutes
- Documentation: 30 minutes

Total: ~3 hours
