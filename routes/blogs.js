const {
  getAllBlogs,
  createBlog,
  getBlogById,
} = require("../database/adapters/blogs");

const blogsRouter = require("express").Router();

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await getAllBlogs();
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await getBlogById(id);
    if (!blog) {
      res.status(404).send({ message: "Blog not found" });
    } else {
      res.send(blog);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/post", async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const postBlog = await createBlog({ title, body });
    res.send(postBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
