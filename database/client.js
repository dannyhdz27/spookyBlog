const { Client } = require("pg"); //makes connection to our database in postgres - Here, you're importing the Client class from the pg library. The Client class is used to interact with a PostgreSQL database.
const client = new Client("postgres://localhost:5432/mySpookyBlog"); //Creating a Database Client Instance:
module.exports = { client }; //exporting this module so we can use it in other files
