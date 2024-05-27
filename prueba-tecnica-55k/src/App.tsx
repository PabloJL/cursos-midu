import { useEffect, useRef, useState } from "react";
import "./App.css";
import { type User } from "./types";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCounty] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCounty((prevState) => !prevState);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredUsers =
    typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;

  const sortedUsers = sortByCountry
    ? filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : filteredUsers;
  //el .sort solo muta el array og por lo cual no se puede volver al og cuando seleccionamos unsort. toSorted devuelve un nuevo array

  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <header>
        <button onClick={toggleColors}>Select Records</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Unsort" : "Sort by Country"}
        </button>
        <button onClick={handleReset}>Resetear Estado</button>

        <input
          type="text"
          placeholder="Filtra por pais"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          showColor={showColors}
          deleteUser={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
