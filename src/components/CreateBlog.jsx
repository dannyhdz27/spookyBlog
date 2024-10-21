import React, { useState } from "react";
import { createBlog } from "../blogService";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await createBlog(title, body);
      console.log("New blog created:", newBlog);
      // Optionally clear the form or give user feedback
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;
