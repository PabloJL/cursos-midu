import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

//no dar nombres a los custom hooks que hagan referencia a lo que hacen por dentro
export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  };
  //Recuperar cita al cargar la pagina
  useEffect(refreshFact, []);

  return { fact, refreshFact };
}
