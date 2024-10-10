const { client } = require("../client");

async function createBlog({ title, body }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO blogs(title, body)
            VALUES($1,$2)
            RETURNING *;
            `,
      [title, body]
    );
    return user;
  } catch (error) {
    console.error("there was an issue creating blog");
  }
}

async function getAllBlogs() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users;
    `);
    return rows;
  } catch (error) {
    console.error("there was an issue getting all users");
  }
}

module.exports = { createBlog, getAllBlogs };
