import { useState, useEffect } from "react";
import BlogList from "./BlogList";
const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/blogs")
      .then((res) => {
        // si le serveur ne renvoie pas un reponse positive je throw une erreur
        if (!res.ok) {
          throw Error("could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setError(null);
        setBlogs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        // ici on catch l'erreur si on arrive pas a atteindre le server
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loadong ...</div>}
      {blogs && <BlogList blogs={blogs} title="All blogs" />}
    </div>
  );
};

export default Home;
