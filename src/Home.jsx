import { useState, useEffect } from "react";
import BlogList from "./BlogList";
const Home = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      });
  }, []);

  const handleOnDelete = (id) => {
    const newBlog = blogs.filter((value) => value.id !== id);
    setBlogs(newBlog);
  };
  return (
    <div className="home">
      {blogs && (
        <BlogList
          blogs={blogs}
          title="All blogs"
          handleOnDelete={handleOnDelete}
        />
      )}
    </div>
  );
};

export default Home;
