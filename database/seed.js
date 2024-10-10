const { client } = require("./client");

const { blogs } = require("./seedData");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS blogs;
      `);

    console.log("...finished dropping tables");
  } catch (error) {
    console.log("Error dropping tables:", error);
  }
}

async function createTables() {
  try {
    console.log("Starting to create tables...");

    await client.query(`
        CREATE TABLE blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          body TEXT NOT NULL
        );
      `);

    console.log("...blogs table created");
  } catch (error) {
    console.log("Error creating tables:", error);
  }
}

async function populateTables() {
  try {
    //users
    console.log("populating user table...");
    for (const blog of blogs) {
      await createUser(user);
    }
    console.log("...users table populated");
  } catch (error) {
    console.log(error);
  }
}
