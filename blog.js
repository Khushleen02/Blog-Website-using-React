import React, { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState("home"); // home | create | detail
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("blogs"));
    if (data) setBlogs(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📝 Blog Website</h2>

      <button onClick={() => setView("home")}>Home</button>
      <button onClick={() => setView("create")} style={{ marginLeft: "10px" }}>
        Create Blog
      </button>

      <hr />

      {view === "home" && (
        <Home blogs={blogs} setView={setView} setSelectedBlog={setSelectedBlog} />
      )}

      {view === "create" && (
        <CreateBlog setBlogs={setBlogs} setView={setView} />
      )}

      {view === "detail" && selectedBlog && (
        <BlogDetail blog={selectedBlog} setView={setView} />
      )}
    </div>
  );
}

function Home({ blogs, setView, setSelectedBlog }) {
  return (
    <div>
      <h3>All Blogs</h3>
      {blogs.length === 0 && <p>No blogs available</p>}

      {blogs.map((blog, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{blog.title}</h4>
          <p><b>Author:</b> {blog.author}</p>
          <p>{blog.content.slice(0, 100)}...</p>
          <button
            onClick={() => {
              setSelectedBlog(blog);
              setView("detail");
            }}
          >
            Read More
          </button>
        </div>
      ))}
    </div>
  );
}

function CreateBlog({ setBlogs, setView }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setBlogs(prev => [...prev, { title, author, content }]);
    setView("home");
  };

  return (
    <form onSubmit={submit}>
      <h3>Create Blog</h3>
      <input placeholder="Title" required onChange={e => setTitle(e.target.value)} /><br /><br />
      <input placeholder="Author" required onChange={e => setAuthor(e.target.value)} /><br /><br />
      <textarea placeholder="Content" required onChange={e => setContent(e.target.value)} /><br /><br />
      <button type="submit">Publish</button>
    </form>
  );
}

function BlogDetail({ blog, setView }) {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p><b>Author:</b> {blog.author}</p>
      <p>{blog.content}</p>
      <button onClick={() => setView("home")}>Back</button>
    </div>
  );
}

export default App;
