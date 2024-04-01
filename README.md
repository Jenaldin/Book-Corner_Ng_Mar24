# The Book Corner by Jenny Guteva (SoftUni Angular Exam Project, April 2024)
The Book Corner web app is provides a blog-like space where small communities, like a neighborhood or other small gathering of people, can lend each other books to read, without any financial transactions and based on mutual agreement it is not for profit, but for expanding the community, getting to know people better and enjoying a shared hobby without needing 2 additional rooms at home for book storage.

## Description
App is entirely in DEV environment and no implementation for PROD is included. DB used is MongoDB and runs on mongodb://127.0.0.1:27017/
FE runs on http://localhost:4200/ and uses: | BE runs on http://localhost:3000/ and uses:
--------------------------------------------|--------------------------------------------
Angular v16, TypeScript | Express, Mongoose
Angular Material | BCrypt, Cookie-parser, JSON Web Token
(check /client/package.json for more) | (check /server/package.json for more)

## Installation
### Prerequisites
- Angular CLI
- Node.js
- MongoDB

### Steps to start
1. Download/Clone repository
2. To install dependencies, run `npm install`.
3. Application has concurrently installed, to start both FE and BE simultaneously run `npm start`.
4. <<***optional***>> If you wish to seed data to MongoDB, use following command `<INSERT LATER AFTER SEED FILES ARE MADE>`.
5. <<***optional***>> Create your own .env file in /server for following variables (if you do not want to use the provided in project OR alternatives): ```DB_URI```, ```DB_PORT```, ```SECRET```, ```SALT```
6. <<***optional***>> If you have changed the DB_PORT, please go to /client/environments and change the apiUrl

## Usage
### End User Perspective
As end user you have the following two possibilities:
- As ***guest user***:
   - See the home, the catalog, the search, the about, the login and register pages;
   - From the home, the catalog and the search pages see the details page of a book;
   - If you try to access a non-existing location, you will be redirected to /404;
   - If you try to access a page you are not authorized to see, you will get a notification and be redirected to login.
- As ***authenticated user***:
   - See the home, the catalog, the search and the about pages and the option to logout;
   - From the home, the catalog and the search pages see the details page of a book;
   - From catalog be able to add a new book;
   - From details page, if the book is added by you (you're the owner), to edit/delete it;
   - From details page, to see the comments section of the book;
   - From the comments section, to create a new comment, edit/delete your comment;
   - From the comments section, to rate other comments as useful or not;
   - When adding your first comment for a book, to rate it;
   - If you try to access a page you are not authorized to see, you will get a notification and be redirected to home.

### REST API Endpoints
Base URL is http://localhost:3000/api

HTTP Method | Description | Endpoint | Guests can access? | Logged in can access? | Ownership required?
------------|-------------|----------|--------------------|-----------------------|--------------------
GET | Test to see if API works | / | Y :heavy_check_mark: | Y :white_check_mark: | N :x:

### Architecture
Here is a ***high-level*** overview of the project's architecture:
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
        - logout
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

## Other information