import { useState, useEffect } from "react";
import BlogList from "./BlogList";
const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "Super evenement",
      body: "creme bruler ce soir",
      author: "Anas",
      id: 1,
    },
    {
      title: "Mauvaise nouvelle",
      body: "plus de creme bruler ce soir",
      author: "Anis",
      id: 2,
    },
    {
      title: "Re mauvaise nouvelle",
      body: "on a retrouvé de la creme bruler ce soir",
      author: "Anas",
      id: 3,
    },
  ]);
  const [name, setName] = useState("mario");
  useEffect(() => {
    console.log(name);
  }, [name]);
  const handleOnDelete = (id) => {
    const newBlog = blogs.filter((value) => value.id !== id);
    setBlogs(newBlog);
  };
  return (
    <div className="home">
      <BlogList
        blogs={blogs}
        title="All blogs"
        handleOnDelete={handleOnDelete}
      />
      <button onClick={() => setName("luigi")}>change name</button>
      <p> {name}</p>
    </div>
  );
};

export default Home;
