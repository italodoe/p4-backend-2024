
# Project: Backend User-Video Management System

## Description
This project is a backend in Typescript, Express, and Prisma for managing users, videos, and comments within a system. These scripts offer functionalities like creating, finding, updating, and deleting users, videos, and comments.

## Installation
To install and run the project, follow these steps:

1. Run `bun install` to install dependencies.
2. Run `docker-compose -f docker/docker-compose.yml up -d` to start Docker containers.
3. Run `bunx prisma db push` or `bunx tsx prisma db push` to apply database migrations.
4. Run `bunx prisma db seed` or `bunx tsx prisma db seed` to seed the database.


## Database 
### Database sqlite Seeding

Sqlite db. To seed the database, follow these steps:

```bash
## Add to schema.prisma
 provider = "sqlite"
 url      = env("DATABASE_URL_SQLITE")
 ```
 ```bash
# (Optional) Delete the current development database file
rm -rf prisma/dev.db

# (Optional) Push any pending migrations to the database
bunx prisma db push
or
bunx tsx prisma db push

# Seed the database with initial data
bunx prisma/seed.ts 
or 
bunx tsx prisma/seed.ts
```

### Database docker postgres Seeding

Docker postgres db. To seed the database, follow these steps:

```bash
## Add to schema.prisma
provider = "postgresql"
url      = env("DATABASE_URL")
 ```
 ```bash
# Push any pending migrations to the database
bunx prisma db push
or
bunx tsx prisma db push

# Seed the database with initial data
bunx prisma/seed.ts 
or 
bunx tsx prisma/seed.ts
```


### Database Vercel postgres Seeding

Vercel postgres db. To seed the database, follow these steps:

```bash
## Add to schema.prisma
provider = "postgresql"
url = env("POSTGRES_PRISMA_URL") // uses connection pooling
directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
```
 ```bash
# Push any pending migrations to the database
bunx prisma db push
or
bunx tsx prisma db push

# Seed the database with initial data
bunx prisma/seed.ts 
or 
bunx tsx prisma/seed.ts
```



## Start the server 
```
bun run dev
or
bun run tsx src/server.ts
```

## Endponts

Each endpoint's functionality, parameters, and expected responses are described below.

### User
- **Description**: Represents a user in the system. A user can have a unique ID, nickname, and email. Users can create and interact with videos and comments.

### Video
- **Description**: Represents a video in the system. Each video has a unique ID, URL, title, description, and is associated with a specific author (user). Videos can receive comments from users.

### Comment
- **Description**: Represents a comment made on a video. Each comment has a unique ID, content, author, and can be associated with a specific video. Comments can also be replies to other comments.


---
### Users
---

#### GET /users/
- **Description**: Retrieve all users.

#### GET /users/id/:id
- **Description**: Retrieve a specific user by their ID.
- **Parameters**:
  - `id` (required): The ID of the user.

#### GET /users/nick/:nick
- **Description**: Retrieve a specific user by their nickname.
- **Parameters**:
  - `nick` (required): The nickname of the user.

#### GET /users/email/:email
- **Description**: Retrieve a specific user by their email.
- **Parameters**:
  - `email` (required): The email of the user.

#### POST /users/
- **Description**: Create a new user.
- **Body**: JSON object containing the user details.
  ```json
  {
    "email": "string",
    "nick": "string",
    "fullName": "string",
    "admin": "boolean"
  }

### PUT /users/id/:id
- **Description**: Update a specific user by their ID.
- **Parameters**:
  - `id` (required): The ID of the user.
- **Body**: JSON object containing the updated user details.
  ```json
  {
    "email": "string",
    "nick": "string",
    "fullName": "string",
    "admin": "boolean"
  }

#### PUT /users/nick/:nick
- **Description**: Update a specific user by their nickname.
- **Parameters**:
  - `nick` (required): The nickname of the user.
- **Body**: JSON object containing the updated user details.
  ```json
  {
    "email": "string",
    "nick": "string",
    "fullName": "string",
    "admin": "boolean"
  }

#### DELETE /users/id/:id
- **Description**: Delete a specific user by their ID.
- **Parameters**:
  - `id` (required): The ID of the user.

#### DELETE /users/nick/:nick
- **Description**: Delete a specific user by their nickname.
- **Parameters**:
  - `nick` (required): The nickname of the user.

---
### Videos
---

#### GET /videos/
- **Description**: Retrieve all videos.

#### GET /videos/author/id/:id
- **Description**: Retrieve videos by a specific author using their ID.
- **Parameters**:
  - `id` (required): The ID of the author.

#### GET /videos/author/nick/:nick
- **Description**: Retrieve videos by a specific author using their nickname.
- **Parameters**:
  - `nick` (required): The nickname of the author.

#### GET /videos/author/email/:email
- **Description**: Retrieve videos by a specific author using their email.
- **Parameters**:
  - `email` (required): The email of the author.

#### GET /videos/id/:id
- **Description**: Retrieve a specific video by its ID.
- **Parameters**:
  - `id` (required): The ID of the video.

#### GET /videos/url/:url
- **Description**: Retrieve a specific video by its URL.
- **Parameters**:
  - `url` (required): The URL of the video.

### GET /videos/search?title
- **Description**: Search for videos by title.
- **Parameters**:
  - `title` (required): The title to search for.

### GET /videos/search?description
- **Description**: Search for videos by description.
- **Parameters**:
  - `description` (required): The description to search for.

### POST /videos/
- **Description**: Create a new video.
- **Body**: JSON object containing the video details.
  ```json
  {
    "authorId": "string",
    "url": "string",
    "title": "string",
    "description": "string"
  }

#### PUT /videos/id/:id
- **Description**: Update a specific video by its ID.
- **Parameters**:
  - `id` (required): The ID of the video.
- **Body**: JSON object containing the updated video details.
  ```json
  {
    "url": "string",
    "title": "string",
    "description": "string"
  }

#### PUT /videos/url/:url
- **Description**: Update a specific video by its URL.
- **Parameters**:
  - `url` (required): The URL of the video.
- **Body**: JSON object containing the updated video details.
  ```json
  {
    "url": "string",
    "title": "string",
    "description": "string"
  }

#### PUT /videos/views/:id
- **Description**: Update the view count of a specific video by its ID.
- **Parameters**:
  - `id` (required): The ID of the video.
- **Body**: JSON object containing the updated view count.

#### DELETE /videos/id/:id
- **Description**: Delete a specific video by its ID.
- **Parameters**:
  - `id` (required): The ID of the video.

#### DELETE /videos/url/:url
- **Description**: Delete a specific video by its URL.
- **Parameters**:
  - `url` (required): The URL of the video.

#### DELETE /videos/author/:id
- **Description**: Delete videos by a specific author.
- **Parameters**:
  - `id` (required): The ID of the author.

---
### Comments
---

#### GET /comments/
- **Description**: Retrieve all comments.

#### GET /comments/:id
- **Description**: Retrieve a specific comment by its ID.
- **Parameters**:
  - `id` (required): The ID of the comment.

#### GET /comments/author/id/:id
- **Description**: Retrieve comments by a specific author using their ID.
- **Parameters**:
  - `id` (required): The ID of the author.

#### GET /comments/author/nick/:nick
- **Description**: Retrieve comments by a specific author using their nickname.
- **Parameters**:
  - `nick` (required): The nickname of the author.

#### GET /comments/author/email/:email
- **Description**: Retrieve comments by a specific author using their email.
- **Parameters**:
  - `email` (required): The email of the author.

#### GET /comments/video/id/:id
- **Description**: Retrieve comments for a specific video by its ID.
- **Parameters**:
  - `id` (required): The ID of the video.

#### GET /comments/video/url/:url
- **Description**: Retrieve comments for a specific video by its URL.
- **Parameters**:
  - `url` (required): The URL of the video.

#### GET /comments/video/:videoId/author/:authorId
- **Description**: Retrieve comments for a specific video by a specific author.
- **Parameters**:
  - `videoId` (required): The ID of the video.
  - `authorId` (required): The ID of the author.

#### GET /comments/parent/:id
- **Description**: Retrieve comments that are replies to a specific comment.
- **Parameters**:
  - `id` (required): The ID of the parent comment.

### POST /comments/
- **Description**: Create a new comment.
- **Body**: JSON object containing the comment details.
  ```json
  {
    "authorId": "string",
    "videoId": "string",
    "text": "string",
    "parentId": "string"
  }

#### PUT /comments/id/:id
- **Description**: Update a specific comment by its ID.
- **Parameters**:
  - `id` (required): The ID of the comment.
- **Body**: JSON object containing the updated comment details.
  ```json
  {
    "text": "string",
    "parentId": "string"
  }

#### PUT /comments/video/:videoId/author/:authorId
- **Description**: Update comments for a specific video by a specific author.
- **Parameters**:
  - `videoId` (required): The ID of the video.
  - `authorId` (required): The ID of the author.
- **Body**: JSON object containing the updated comment details.
  ```json
  {
    "text": "string",
    "parentId": "string"
  }

#### DELETE /comments/id/:id
- **Description**: Delete a specific comment by its ID.
- **Parameters**:
  - `id` (required): The ID of the comment.

#### DELETE /comments/video/:id
- **Description**: Delete comments for a specific video by its ID.
- **Parameters**:
  - `id` (required): The ID of the video.

#### DELETE /comments/author/:id
- **Description**: Delete comments by a specific author.
- **Parameters**:
  - `id` (required): The ID of the author.


## Endpoint Testing Script

This script is designed to test various endpoints of the API. It performs HTTP requests to the specified endpoints and logs the responses to the console.

### How to Run

To run the test script:

```bash
bun src/test/script.ts 
or 
bun tsx src/test/script.ts
