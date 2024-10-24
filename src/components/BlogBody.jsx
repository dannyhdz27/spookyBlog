import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBlog from "../blogService";

function BlogBody() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlog(id);
        setBlog(data);
        console.log("here's your data", data);
        console.log(id);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{blog[id - 1].title}</h2>
      <p>{blog[id - 1].body}</p>
    </div>
  );
}

export default BlogBody;
