import { useState } from "react";
import Todos from "./components/Todos";
import { FilterValue, type TodoId, type Todo as TodoType } from "./types";
import { Footer } from "./components/Footer";
import { TODO_FILTERS } from "./const";
import { Header } from "./components/Header";

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
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

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

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed;
    }

    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed;
    }

    return todo;
  });

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = (title: string): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <Header saveTodo={handleAddTodo} />
      <Todos
        onCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveAllCompleted}
      />
    </div>
  );
}

export default App;
