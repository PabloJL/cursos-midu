import {
  type ListOfTodos,
  type TodoId,
  type Todo as TodoType,
} from "../types.d";
import Todo from "./Todo";

interface Props {
  todos: ListOfTodos;
  onCompleteTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
  onRemoveTodo: ({ id }: TodoId) => void;
}

const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onCompleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed} ?  "completed" : ""`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onCompleteTodo={onCompleteTodo}
          />
        </li>
      ))}
    </ul>
  );
};

export default Todos;
