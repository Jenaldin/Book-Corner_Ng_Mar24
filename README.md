# The Book Corner by Jenny Guteva
The Book Corner is initially designed as an Angular Exam Project for SoftUni's April 2024 examination session. However, with the author's evolving commitments and availability, it holds the potential to blossom into a passion project, having additional features in the future.

The essence of The Book Corner lies in its ability to foster a virtual, blog-like space for small communities - be it a neighborhood or any small group of individuals. It serves as a platform where book enthusiasts can lend and borrow books, fostering a culture of shared reading experiences. This process involves no financial transactions and operates purely on mutual agreements. The primary objective is to cultivate stronger community bonds, facilitate better understanding among members, and indulge in a shared hobby. It's a solution for those who love books but are constrained by space at home for book storage.

App can be also found deployed here: https://the-book-corner.up.railway.app/

## Project Overview
The App is currently in the development phase, with no production options included. It utilizes MongoDB as its database (mongodb://127.0.0.1:27017/).
Frontend operates on http://localhost:4200/ and incorporates : | Backend runs on http://localhost:3000/ and employs:
---------------------------------------------------------------|----------------------------------------------------
Angular, TypeScript | Express, Mongoose
Angular Material (HTML, SCSS) | BCrypt, Cookie-parser, JSON Web Token
(For more details, please refer to ```/client/package.json```) | (For more details, please refer to ```/server/package.json```)

## Installation Guide
### Prerequisites
- Angular CLI
- Node.js
- MongoDB

### Setup Instructions
1. Download or clone the repository.
2. Run `npm run install-all` to install all the necessary dependencies from `package.json` files for the project (root, server & client).
3. The application uses ‘concurrently’. To start both the frontend and backend simultaneously, run `npm run start-all`. Alternatively, run separately `ng serve` in /client for the frontend and `npm start` in /server for the backend.
4. <<***optional***>> If you wish to seed data to MongoDB, use following command: `npm run seed`. Alternatively, if you have MongoDB Compass, you can download the files from /server/seed and import them manually.
5. <<***optional***>> Create your own .env file in /server for the following variables if you prefer not to use the provided project "OR" alternatives: ```DB_URI```, ```DB_PORT```, ```SECRET``` and ```SALT```.
6. <<***optional***>> If you have modified the DB_PORT, navigate to /client/environments and update the apiUrl.

## Usage
### From an End User Perspective
- As a ***guest user***, you can:
   - Access the home, catalog, search, about, login, and register pages;
   - View the details page of a book from the home, catalog, and search pages;
   - If you attempt to access a non-existent location, you will be redirected to /404;
   - If you try to access a page for which you lack authorization, you will receive a notification and be redirected to the login page.
- As an ***authenticated user***, you can:
   - Access the home, catalog, search, about, and profile pages, and have the option to logout;
   - View the details page of a book from the home, catalog, and search pages;
   - Add a new book from the catalog page;
   - If you’re the owner of a book, edit or delete it from its details page;
   - View the comments section of a book from its details page;
   - Create a new comment, edit or delete your comment from the comments section;
   - Rate other users’ comments as useful or not from the comments section;
   - When adding your first comment for a book, rate the book;
   - View your profile and modify some of its content - your avatar, your first and last name, your email, add “about me” information, see which books you own and which books you have requested;
   - View other users’ profiles, which contain the same types of information as yours;
   - If you try to access a page for which you lack authorization, you will receive a notification and be redirected to the home page.

### REST API Endpoints
Base URL is http://localhost:3000/api.
***Note:*** In the table below, “Ownership” indicates that the user is already logged in. Therefore, where “Ownership” is required, “Logged in” is marked with **-** and vice versa (if “Logged in” is required, but “Ownership” is not, the latter is marked with **-**).

Endpoint | HTTP Method | Description | Accessible to Guests (Y/N)? | Accessible when Logged in (Y/N)? | Requires Item Ownership (Y/N)?
---------|:-----------:|-------------|:---------------------------:|:--------------------------------:|:----------------------------:
/catalog | GET | Retrieves all book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog | POST | Creates a new book item | :x: | :heavy_check_mark: | **-**
/catalog/latest | GET | Retrieves the latest 5 book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/search | GET | Retrieves search results | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | GET | Retrieves details of a book item | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | PUT | Updates/Edits details of a book item | :x: | **-** | :heavy_check_mark:
/catalog/:bookId | DELETE | Deletes a book item | :x: | **-** | :heavy_check_mark:
/catalog/requestSub/:bookId | PUT | Subscribes to a book item (Request to read it) | :x: | :heavy_check_mark: | **-**
/catalog/cancelSub/:bookId | PUT | Unsubscribes from a book item (Cancel request to read it) | :x: | :heavy_check_mark: | **-**
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/user/register | POST | Creates a new user item | :heavy_check_mark: | :x: | **-**
/user/login | POST | Logs in as an existing user | :heavy_check_mark: | :x: | **-**
/user/logout | POST | Logs out an existing user | :x: | :heavy_check_mark: | **-**
/user/profile/:userId | GET | Retrieves a user profile | :x: | :heavy_check_mark: | **-**
/user/my-profile/:userId | GET | Retrieves your profile | :x: | **-** | :heavy_check_mark:
/user/my-profile/:userId | PUT | Updates/Edits your profile | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment | GET | Retrieves all comment items associated with a book item | :x: | :heavy_check_mark: | **-**
/comment/new | POST | Creates a new comment item | :x: | :heavy_check_mark: | **-**
/comment/:commentId | PUT | Updates/Edits the content of a comment item | :x: | **-** | :heavy_check_mark:
/comment/:commentId | DELETE | Deletes a comment item | :x: | **-** | :heavy_check_mark:
/comment/voteYes/:commentId | PUT | Votes for a comment item with "yes" (useful) | :x: | :heavy_check_mark: | **-**
/comment/voteNo/:commentId | PUT | Votes for a comment item with "no" (not useful) | :x: | :heavy_check_mark: | **-**

### Project structure
Here is a ***high-level*** overview of the project's structure:
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
  - seed
  - services
  - utils
  
