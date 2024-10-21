import React, { useEffect, useState } from "react";
import getAllBlogs from "../blogService";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await getAllBlogs();
      setBlogs(response);
    }
    fetchBlogs();
  }, []);
  console.log("blogs?", blogs);

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
          </div>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
}

export default BlogList;
