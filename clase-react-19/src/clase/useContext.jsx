import { use } from "react";
import { UserContext } from "../context/user";

export function UseContextExample() {
  const { name, isLogged, updateUser } = use(UserContext);

  return (
    <div>
      {isLogged ? (
        <>
          <p>Hola {name}</p>
          <button onClick={() => updateUser({ name: null, isLogged: false })}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <p>Bienvenido</p>
          <button onClick={() => updateUser({ name: "Pablo", isLogged: true })}>
            Log in
          </button>
        </>
      )}
    </div>
  );
}
