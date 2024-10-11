const express = require("express"); // Importing the Express.js library
require("express-async-errors"); // Importing library to handle async errors without try-catch

const { errorHandler, notFoundURLHandler } = require("./middlewares/errors"); // Importing custom middlewares for error handling and handling non-existing URLs

const fileUpload = require("express-fileupload"); // Importing middleware to handle file uploads
const app = express(); // Initializing the Express application
const port = process.env.PORT || 3000; // Defining the port, defaulting to 3000 if no environment variable is set
const router = require("./routes"); // Importing routes which contain API route definitions

// Middleware to parse JSON request body
app.use(express.json()); 

// Middleware to handle file uploads, with a maximum file size of 50MB
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }, // Limiting file size to a maximum of 50MB
    })
);

// Middleware to connect all the routes defined in the ./routes file
app.use("/", router);

// Middleware to handle any requests to undefined routes
app.use("*", notFoundURLHandler);

// Global error handling middleware, should be placed last in the middleware stack
app.use(errorHandler);

// Starting the server and listening for requests on the defined port
app.listen(port, () => {
    console.log(`The express.js app is running on port ${port}`); // Message to be displayed when the server is successfully running
});
