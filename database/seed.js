const { client } = require("./client");

const { blogs } = require("./seedData");

const { createBlog, getAllBlogs } = require("./adapters/blogs");

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
    console.log("populating blogs table...");
    for (const blog of blogs) {
      await createBlog(blog);
    }
    console.log("...blogs table populated");
  } catch (error) {
    console.log(error);
  }
}

async function testDB() {
  const _blog = await getAllBlogs();
  console.log("your blogs:", _blog);
}

async function buildDatabase() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
    await testDB();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}
buildDatabase();
