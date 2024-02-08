# Pet Support API

This is the backend API for the PET-SUPPORT project. It provides endpoints for managing users, pets, categories, notices, and authentication.
The API is built with Nest.js and uses MongoDB as its database.

### [Swagger](https://pet-support-nest.up.railway.app/api) 

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/VVr17/pet-support-nest.git
```

2. Install dependencies:

```bash
$ cd pet-support-nest
$ npm install
```
3.Set up environment variables:
  * MONGO_URI=your-mongodb-uri
  * JWT_SECRET=your-jwt-secret

Replace your-mongodb-uri and your-jwt-secret with your MongoDB URI and a secret key for JWT token generation.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

  ### Authentication
* POST /auth/signup: Register a new user.
* POST /auth/login: Log in with email and password.

  ### Users
* GET /users/me: Get current user data.
* PUT /users/me: Update current user data.
* DELETE /users/me: Delete current user account.
* GET /users/me/notices: Get notices posted by the current user.
* GET /users/me/favorites: Get notices favorites by the current user.
* POST /users/me/favorites/:id: Add a notice to favorites for the current user.
* DELETE /users/me/favorites/:id: Remove a notice from favorites for the current user.
* GET /users/me/pets: Get pets belonging to the current user.
  
  ### Pets
* POST /pets: Create a new pet.
* PUT /pets/:id: Update a pet by ID.
* DELETE /pets/:id: Delete a pet by ID.

 ### Categories
* POST /categories: Create a new category.
* GET /categories: Get all categories.
* GET /categories/:id: Get a category by ID.

  ### Notices
* POST /notices: Create a new notice.
* GET /notices: Get all notices.
* GET /notices/:id: Get a notice by ID.
* PUT /notices/:id: Update a notice by ID.
DELETE /notices/:id: Delete a notice by ID.
