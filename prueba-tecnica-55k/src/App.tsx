import { useEffect, useState } from "react";
import "./App.css";
import { type User } from "./types";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCounty] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCounty((prevState) => !prevState);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;
  //el .sort solo muta el array og por lo cual no se puede volver al og cuando seleccionamos unsort. toSorted devuelve un nuevo array

  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <header>
        <button onClick={toggleColors}>Select Records</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Unsort" : "Sort by Country"}
        </button>
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
