import { useState } from "react";
import Todos from "./components/Todos";
import { type TodoId, type Todo as TodoType } from "./types";

const mockTodos = [
  {
    id: "2",
    title: "Sacar al miduperro a pasear",
    completed: false,
  },
  {
    id: "3",
    title: "Ir a por el pan",
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(mockTodos);

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <Todos
        onCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={todos}
      />
    </div>
  );
}

export default App;
