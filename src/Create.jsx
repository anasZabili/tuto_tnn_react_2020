import { useState } from "react";
import { useHistory } from "react-router";
const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("mario");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      title: title,
      body: content,
      author: author,
    };
    setIsPending(true);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    }).then((response) => {
      console.log(response);
      setIsPending(false);
      history.push("/");
      // la famille ce truc a ne pas negliger
      // history.go(-1);
    });
  };
  return (
    <div className="create">
      <h2>Add new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title :</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog content :</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label>Blog author :</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario"> mario </option>
          <option value="yoshi"> yoshi </option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button>Adding blog ...</button>}
      </form>
    </div>
  );
};

export default Create;
