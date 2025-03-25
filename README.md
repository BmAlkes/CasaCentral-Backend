Backend Project

Description

This is a Node.js backend project using Express.js and Prisma as an ORM. The project includes essential middleware such as CORS, cookie-parser, and dotenv for environment configuration.

Features

Express.js for server-side logic

Prisma ORM for database management

CORS support for handling cross-origin requests

Cookie parsing for authentication

Environment variable management with dotenv

Nodemon for automatic server restarts during development

Prerequisites

Make sure you have the following installed:

Node.js (latest LTS version recommended)

npm or yarn

Installation

Clone the repository:

git clone https://github.com/your-repo/backend.git
cd backend

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory and define your variables as needed.

Usage

Start the development server

npm run start

This will run the server using Nodemon for automatic reload on file changes.

Running tests

(Currently not implemented)

Dependencies

The project uses the following dependencies:

@prisma/client - Prisma ORM client

cookie-parser - Middleware for parsing cookies

cors - Middleware for handling CORS

dotenv - Loads environment variables from a .env file

express - Web framework for Node.js

express-async-handler - Middleware for handling async errors

express-oauth2-jwt-bearer - Middleware for OAuth2 authentication

mongodb - MongoDB driver for Node.js

nodemon - Tool for automatically restarting the server during development

License

This project is licensed under the ISC License.