import { Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/post" element={<CreateBlog />} />
    </Routes>
  );
}

export default App;
