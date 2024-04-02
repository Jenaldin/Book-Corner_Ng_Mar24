# The Book Corner by Jenny Guteva
This project is intended as a SoftUni Angular Exam Project for exam session in April 2024; In the future, per author's available time and other commitments, it could become a passion project and grow with more functionalities.

The Book Corner web app provides a blog-like space where small communities, like a neighborhood or other small gathering of people, can lend each other books to read, without any financial transactions and based on mutual agreement it is not for profit, but for expanding the community, getting to know people better and enjoying a shared hobby without needing 2 additional rooms at home for book storage.

## Description
App is entirely in DEV stage and no options for PROD are included. DB used is MongoDB (mongodb://127.0.0.1:27017/)
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
- As ***guest user*** you can:
   - See the home, the catalog, the search, the about, the login and the register pages;
   - From the home, the catalog and the search pages to see the details page of a book;
   - If you try to access a non-existing location, you will be redirected to /404;
   - If you try to access a page you are not authorized to see, you will get a notification and be redirected to login.
- As ***authenticated user*** you can:
   - See the home, the catalog, the search, the about and the profile pages and the option to logout;
   - From the home, the catalog and the search pages see the details page of a book;
   - From catalog - to add a new book;
   - From details page, if the book is added by you (you're the owner), to edit/delete it;
   - From details page, to see the comments section of the book;
   - From the comments section, to create a new comment, edit/delete your comment;
   - From the comments section, to rate other users' comments as useful or not;
   - When adding your first comment for a book, to rate the book;
   - To see your profile and change some of its content - your avatar, your first and last name, your e=mail, add "about me" information, see which are the books you own and which are the books you have requested;
   - To see other users' profiles, containing the same types of information as yours does;
   - If you try to access a page you are not authorized to see, you will get a notification and be redirected to home.

### REST API Endpoints
Base URL is http://localhost:3000/api
***Note:*** In below table, Ownership indicates the user is already logged in, so where Ownership is required, the Logged in is marked with **-**

Endpoint | HTTP Method | Description | Guests can access (Y/N)? | Logged in can access (Y/N)? | Item Ownership required (Y/N)?
---------|:-----------:|-------------|:------------------------:|:---------------------------:|:----------------------------:
/catalog | GET | Get all the book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog | POST | Create a new book item | :x: | :heavy_check_mark: | **-**
/catalog/latest | GET | Get the latest 5 book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/search | GET | Get the search results | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | GET | Get the details of a book item | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | PUT | Update/Edit the details of a book item | :x: | **-** | :heavy_check_mark:
/catalog/:bookId | DELETE | Delete a book item | :x: | **-** | :heavy_check_mark:
/catalog/requestSub/:bookId | PUT | Subscribe to a book item (Request to read it) | :x: | :heavy_check_mark: | **-**
/catalog/cancelSub/:bookId | PUT | Unsubscribe to a book item (Cancel request to read it) | :x: | :heavy_check_mark: | **-**
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/user/register | POST | Create a new user item | :heavy_check_mark: | :x: | **-**
/user/login | POST | Login as an existing user | :heavy_check_mark: | :x: | **-**
/user/logout | POST | Logout an existing user | :x: | :heavy_check_mark: | **-**
/user/profile/:userId | GET | Get a user profile | :x: | :heavy_check_mark: | **-**
/user/my-profile/:userId | GET | Get your profile | :x: | **-** | :heavy_check_mark:
/user/my-profile/:userId | PUT | Update/Edit your profile | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment | GET | Get all the comment items associated with book item | :x: | :heavy_check_mark: | **-**
/comment/new | POST | Create a new comment item | :x: | :heavy_check_mark: | **-**
/comment/:commentId | PUT | Update/Edit the content of a comment item | :x: | **-** | :heavy_check_mark:
/comment/:commentId | DELETE | Delete a comment item | :x: | **-** | :heavy_check_mark:
/comment/voteYes/:commentId | PUT | Vote for a comment item with yes (useful) | :x: | :heavy_check_mark: | **-**
/comment/voteNo/:commentId | PUT | Vote for a comment item with no (not useful) | :x: | :heavy_check_mark: | **-**

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
  