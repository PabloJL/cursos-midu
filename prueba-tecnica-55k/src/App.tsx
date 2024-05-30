import { useMemo, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types.d";
import { UsersList } from "./components/UsersList";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error on the request");
      return await res.json();
    })
    .then((res) => {
      const nextCursor = Number(res.info.page);
      return {
        users: res.results,
        nextCursor,
      };
    });
};

function App() {
  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery<{ users: User[]; nextCursor: number }>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPsageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const users: User[] = data?.pages?.flatMap((page) => page.users) ?? [];
  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = async () => {
    await refetch();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email);
    // setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  //el .sort solo muta el array og por lo cual no se puede volver al og cuando seleccionamos unsort. toSorted devuelve un nuevo array
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <header>
        <button onClick={toggleColors}>Select Records</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? "Unsort" : "Sort by Country"}
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
        {users.length > 0 && (
          <UsersList
            users={sortedUsers}
            showColor={showColors}
            deleteUser={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}
        {isLoading && <p>Loading ...</p>}
        {isError && <p>There´s been an error</p>}
        {!isError && users.length === 0 && <p>There´s no users</p>}

        {!isLoading && !isError && (
          <button onClick={() => fetchNextPage()}>Load more users</button>
        )}
      </main>
    </div>
  );
}

export default App;
