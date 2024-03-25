import "./App.css";

function App() {
  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form">
          <input type="text" placeholder="Avengers, Star Wars, IT" />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>Resultados</main>
    </div>
  );
}

export default App;
