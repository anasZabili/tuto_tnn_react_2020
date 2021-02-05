import { useParams } from "react-router";

const BlogDetails = () => {
  const { id } = useParams();

  return (
    <div className="blog-details">
      <h2>Plein de details of id {id}</h2>
    </div>
  );
};

export default BlogDetails;
