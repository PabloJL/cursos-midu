import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";
import "./App.css";

function App() {
  //fact
  const { fact, refreshFact } = useCatFact();
  //image
  const { imageUrl } = useCatImage({ fact }); //se pasa como objeto por extensibilidad (mas parametros)

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {/* <p>{imageUrl}</p> */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
