# The Book Corner
My (Jenny Guteva) Angular project for SoftUni course final exam March/April 2024.

## Description
Currently app is entirely in DEV environment and no implementation for PROD is included. 
- FE runs on http://localhost:4200/ and is build with:
   - Angular v16
   - Angular Material
   - TypeScript
   - (check /client/package.json for more dependencies)
- BE (server API as a RESTFul service) runs on http://localhost:3000/api and is build with:
   - Express
   - Mongoose
   - BCrypt
   - Cookie-parser
   - JSON Web Token
   - (check /server/package.json for more dependencies)
- DB used is MongoDB and runs on mongodb://127.0.0.1:27017/

## Application Idea
The Book Corner web app is provides a blog-like space where small communities, like a neighborhood or other small gathering of people, can lend each other books to read, without any financial transactions and based on mutual agreement it is not for profit, but for expanding the community, getting to know people better and enjoying a shared hobby without needing 2 additional rooms at home for book storage.

## Installation
### Prerequisites
- Angular CLI
- Node.js
- MongoDB

### Steps to start
1. Download/Clone repository
2. To install dependencies, run `npm install`.
3. Application has concurrently installed, to start both FE and BE simultaneously run `npm start`.
4. To seed data to MongoDB, use following command `<INSERT LATER AFTER SEED FILES ARE MADE>`.
5. Create your own .env file in /server for following variables (if you do not want to use the provided in project || locations)
```bash
DB_URI
DB_PORT
SECRET
SALT
```

## Usage
### End User Perspective
As end user you have the following two possibilities:
- As **guest user**:
   - See the home, the catalog, the search, the about, the login and register pages;
   - From the home, the catalog and the search pages see the details page of a book;
   - If you try to access a non-existing location, you will be redirected to /404;
   - If you try to access a page you are not authorized to see, you will get a notification and be redirected to login.
- As **authenticated user**:
   - See the home, the catalog, the search and the about pages and the option to logout;
   - From the home, the catalog and the search pages see the details page of a book;
   - From catalog be able to add a new book;
   - From details page, if the book is added by you (you're the owner), to edit/delete it;
   - From details page, to see the comments section of the book;
   - From the comments section, to create a new comment, edit/delete your comment;
   - From the comments section, to rate other comments as useful or not;
   - When adding your first comment for a book, to rate it;
   - If you try to access a page you are not authorized to see, you will get a notification and be redirected to home.

### Architecture
Here is a high-level overview of the project's architecture:
- client
  - src
    - app
      - books
        - add-book
        - catalog
        - edit-book
        - view-book
      - comments
        - add-comment
        - all-comments
        - edit-comment
      - core
        - guards
        - services
        - types
        - utils
      - main
        - about
        - home
        - not-found
        - search
      - shared
        - footer
        - header
        - navigation
      - users
        - login
        - profile
        - register
        - view-profile
    - assets
      - img
    - environments
- server
  - controllers
  - middlewares
  - models
  - router
  - services
  - utils

### API Endpoints

## Other information