import { Filters } from "./Filters";
import { FilterValue } from "../types";

interface Props {
  handleFilterChange: (filter: FilterValue) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  filterSelected: FilterValue;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  filterSelected,
  handleFilterChange,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> items left
      </span>
      <Filters
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
      {completedCount > 0 && (
        <button onClick={onClearCompleted} className="clear-completed">
          Borrar Completadas
        </button>
      )}
    </footer>
  );
};
