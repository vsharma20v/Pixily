import { useEffect, useState } from "react";

const url = `https://api.unsplash.com/photos/random?count=20&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
let localRandomPhotos = null;

const useFetchRandomPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    try {
      localRandomPhotos = JSON.parse(localStorage.getItem("randomPhotos"));
    } catch (error) {
      console.error(error);
      setError(error.message);
      localStorage.removeItem("randomPhotos");
      setIsLoading(false);
    }

    if (localRandomPhotos) {
      setPhotos(localRandomPhotos);
      setError("");
      setIsLoading(false);
    } else {
      fetch(url, { signal: abortController.signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong! Couldn't fetch the photos.");
          }
          return res.json();
        })
        .then((data) => {
          const modifiedData = data.map((d) => ({
            id: d.id,
            alt: d.alt_description,
            src: d.urls.small,
          }));
          setPhotos(modifiedData);
          localStorage.setItem("randomPhotos", JSON.stringify(modifiedData));
          setError("");
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(error);
            setError(error.message);
            setIsLoading(false);
          }
        });
    }
    return () => {
      abortController.abort();
    };
  }, []);

  return { photos, error, isLoading };
};

export default useFetchRandomPhotos;
