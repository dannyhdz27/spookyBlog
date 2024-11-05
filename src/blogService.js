export default async function getAllBlogs() {
  try {
    const response = await fetch("/api/blogs");

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

// Create a new blog by sending a POST request to the API
export async function createBlog(title, body) {
  try {
    const response = await fetch("/api/blogs/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }), // Send title and body in the request
    });
    const newBlog = await response.json();
    return newBlog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

export async function getBlog(id) {
  try {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with id ${id}: ${response.status}`);
    }
    const blog = await response.json();
    return blog;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
}
export async function registerUser(username, password) {
  const response = await fetch("api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

export async function loginUser(username, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const responseBody = await response.json();
  console.log("the api response:", responseBody);

  const { success, message, data } = responseBody;

  if (!success) {
    throw new Error(message);
  }
  return { success, message, data };
}

export async function fetchMe() {
  const response = await fetch("/api/users/me");
  const { success, message, user } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, user };
}

export async function logout() {
  const response = await fetch("/api/users/logout");
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

export async function getUserRoutines(username) {
  try {
    const response = await fetch(`/api/users/${username}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
