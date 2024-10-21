// Fetch all blogs from the API
export default async function getAllBlogs() {
  try {
    const response = await fetch("/api/blogs");
    console.log(response);
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
