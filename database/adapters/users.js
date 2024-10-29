const { client } = require("../client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
              INSERT INTO users(username, password)
          VALUES($1,$2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
              `,
      [username, password]
    );
    return user;
  } catch (error) {
    console.error("there was an issue creating user in adapter");
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT * 
          FROM users
          WHERE username= $1
      `,
      [username]
    );

    return user;
  } catch (error) {
    console.error("there was an issue getting the user by username");
  }
}

module.exports = { createUser, getUserByUsername };
