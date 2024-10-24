import { Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import BlogBody from "./components/BlogBody";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/post" element={<CreateBlog />} />
      <Route path="/blogs/:id" element={<BlogBody />} />
    </Routes>
  );
}

export default App;
