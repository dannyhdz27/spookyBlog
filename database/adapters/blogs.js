const { client } = require("../client");

async function createBlog({ title, body }) {
  try {
    const {
      rows: [blog],
    } = await client.query(
      `
            INSERT INTO blogs(title, body)
            VALUES($1,$2)
            RETURNING *;
            `,
      [title, body]
    );
    return blog;
  } catch (error) {
    console.error("there was an issue creating blog");
    throw error;
  }
}

async function getAllBlogs() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM blogs;
    `);
    return rows;
  } catch (error) {
    console.error("there was an issue getting all blogs");
    throw error;
  }
}

module.exports = { createBlog, getAllBlogs };
