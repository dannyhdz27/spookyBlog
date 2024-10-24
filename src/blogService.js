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
