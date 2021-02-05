import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // cet object sert a abort un requet
    // util par exemple si l'utilisateur souhaite changer de page
    // avant la fin de la requete
    const abortCont = new AbortController();
    // on associe l'objet abort a la requete
    // Pourquoi faire tout ça ??
    // Pour eviter qu'un composant qui n'est plus au premier plan
    // mettent a jour ses stat
    fetch(url, { signal: abortCont.signal })
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
        // on fait ça pour ne pas mettre a jour les etat si la requete a été abort
        // car si la requete a ete abort le composant n'est plus monté
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // ici on catch l'erreur si on arrive pas a atteindre le server
          setError(err.message);
          setIsLoading(false);
        }
      });
    // clean function
    // notre cleanup fonction abort la requete
    return () => abortCont.abort();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
