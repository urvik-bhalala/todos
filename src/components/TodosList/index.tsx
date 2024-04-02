import { Stack } from "react-bootstrap";
import { todosType } from "../Todos";
import { BsCheckLg } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

import "./todoslist.scss";

const TodosList = ({
  todo,
  onUpdateTodo,
  onDeleteTodo,
}: {
  todo: todosType;
  onUpdateTodo: (todo: todosType) => void;
  onDeleteTodo: (todoId: string) => void;
}) => {
  return (
    <div
      className={`todo-item d-flex py-2 align-items-center mb-3 ${
        todo.taskStatus === "completed" ? `active` : ""
      }`}
    >
      <Stack
        className="todo-name align-items-center w-100"
        direction="horizontal"
      >
        {todo.taskName}
      </Stack>
      <div
        className={`todo-action-btn cursor-pointer p-2 me-2 todo-active-status `}
        onClick={() => onUpdateTodo(todo)}
      >
        <BsCheckLg />
      </div>
      <div
        className={`todo-action-btn cursor-pointer p-2 `}
        onClick={() => onDeleteTodo(todo._id)}
      >
        <BsFillTrash3Fill />
      </div>
    </div>
  );
};

export default TodosList;
