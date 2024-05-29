import { version } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { UseFetchExample } from "./clase/useExample";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <title>{`Hola React ${version}`}</title>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1 style={{ marginBottom: 0 }}>Hi React 19</h1>
          <small style={{ color: "yellow", fontSize: "10px" }}>
            La version es {version}
          </small>
        </a>
        <UseFetchExample />
      </div>
    </>
  );
}

export default App;
