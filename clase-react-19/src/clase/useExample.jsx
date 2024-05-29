import { Suspense, use, useState } from "react";

export function UseFetchExample() {
  const [name, setName] = useState("");

  const fetchPokemon = () => {
    if (!name) return Promise.resolve();

    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      if (res.ok) return res.json();
      return { error: true, message: "Pokemon not found" };
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Ej. Pikachu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <Suspense fallback={<div>Cargando...</div>}>
        <ShowPokemon pokemonPromise={fetchPokemon()} />
      </Suspense>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ShowPokemon({ pokemonPromise }) {
  const pokemon = use(pokemonPromise);

  if (pokemon?.error) {
    return <div>Error: {pokemon.message} </div>;
  }

  if (!pokemon) return null;

  return (
    <div>
      Resultado
      <article>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>{pokemon.description} </p>
      </article>
    </div>
  );
}
