/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

//Crear el contexto
export const FiltersContext = createContext();

//Crear el provider
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 250,
  });
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
