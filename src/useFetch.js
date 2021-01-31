import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
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
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        // ici on catch l'erreur si on arrive pas a atteindre le server
        setError(err.message);
        setIsLoading(false);
      });
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
