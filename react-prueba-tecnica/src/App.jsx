import { useEffect, useState } from "react";
import { getRandomFact } from "./services/facts";
import "./App.css";

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`;
const CAT_PREFIX_IMG_URL = "https://cataas.com";

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [factError, setFactError] = useState();

  //Recuperar cita al cargar la pagina
  useEffect(() => {
    getRandomFact().then(setFact);
  }, []);

  //Recuperar imagen cada que hay imagen nueva
  useEffect(() => {
    if (!fact) return;
    const threeFirstWords = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
        // console.log(url);
      });
  }, [fact]);

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      <p>{imageUrl}</p>
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMG_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
