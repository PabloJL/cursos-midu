import { type TodoId, type Todo as TodoType } from "../types.d";

interface Props extends TodoType {
  onCompleteTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
  onRemoveTodo: ({ id }: TodoId) => void;
}

const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onCompleteTodo,
}) => {
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={(event) => {
          onCompleteTodo({ id, completed: event.target.checked });
        }}
      />
      <label> {title} </label>
      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo({ id });
        }}
      />
    </div>
  );
};

export default Todo;
