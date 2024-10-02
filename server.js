require("dotenv").config();
// Loads environment variables from a `.env` file into `process.env`.
// This is useful for storing sensitive information like API keys, database credentials, and secrets.

const express = require("express");
const server = express();
// Here, you're creating an Express application. `server` is the instance of the Express app.

const port = 3000;
// The port your server will listen on, in this case, 3000.

const path = require("path");
// Node.js built-in module used to work with file and directory paths. No need to install via npm.

const { client } = require("./database/client");
// Importing the `client` object from your `client.js` file, which handles the PostgreSQL connection.

client.connect();
// Connects to the PostgreSQL database. This establishes the connection to allow querying the database.

// MIDDLEWARE SECTION

server.use(express.json());
// Middleware that parses incoming request bodies with JSON payloads.
// This allows your API to easily access JSON data from client requests (e.g., from POST requests).

const morgan = require("morgan");
// Morgan is a logging middleware. It logs details about each HTTP request (e.g., method, status, response time).
// Extremely useful for debugging and monitoring API requests.

server.use(morgan("dev"));
// "dev" is a preconfigured log format that displays concise colored output in the terminal for each request.

const cookieParser = require("cookie-parser");
// Middleware that parses cookies attached to the client requests.
// `process.env.COOKIE_SECRET` provides a secret to sign cookies, adding a layer of security (preventing cookie tampering).

server.use(cookieParser(process.env.COOKIE_SECRET));
// This configures cookie parsing, where your `COOKIE_SECRET` ensures cookies are securely signed.

server.use(express.static(path.join(__dirname, "./client", "dist")));
// Middleware to serve static files (HTML, CSS, JS) from the `./client/dist` directory (which contains your front-end app).
// It’s useful when you have a separate client-side (like React) that’s built and served alongside your server.

const cors = require("cors");
// CORS (Cross-Origin Resource Sharing) middleware to allow requests from different origins.
// If your client (React app) is running on a different domain or port (e.g., `localhost:3000` for the server, `localhost:8080` for the client), this allows them to communicate.

server.use(cors());
// Enabling CORS for all routes. You can configure it to allow only specific domains for security.

// ROUTES SECTION

server.get("/", (req, res) => {
  res.send("This is the HOME page");
});
// Simple route for the root endpoint. When users access `/`, it sends back the string "This is the HOME page".

server.use("/api", require("./routes"));
// Routes for the API. The `./routes` file would contain your API endpoints (e.g., `/api/users`, `/api/products`).
// This allows you to keep the route definitions modular and organized.

// ERROR HANDLING

server.use((err, req, res, next) => {
  res.send({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});
// Custom error-handling middleware.
// Whenever an error is passed (either via `throw` or by calling `next(err)`), this middleware will catch it.
// It sends back a JSON response with the error details, making it easier to debug errors during development.
// `err.stack` provides a detailed call stack to trace where the error occurred (useful during development but should be disabled in production).

// SERVE REACT APPLICATION (for all other routes)

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});
// This middleware is a fallback for all other routes not handled by your API or other routes.
// When a user tries to access any route not explicitly defined (e.g., `/about`, `/contact`), it serves the built `index.html` file of your React app.
// This allows your front-end router (like React Router) to handle the page navigation.

// SERVER LISTEN

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
// This starts your Express server, listening on the specified port (3000 in this case).
// When the server starts successfully, it logs `listening on port 3000` in the terminal.
