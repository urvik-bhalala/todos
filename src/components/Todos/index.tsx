import { useEffect, useState } from "react";
import TodoInput from "../TodoInput";
import {
  addTodoAPI,
  deleteTodoAPI,
  getAllTodosAPI,
  updateTodoAPI,
} from "../../api/todosAPI";
import { Button, Stack } from "react-bootstrap";
import TodosList from "../TodosList";

import "./todos.scss";

export type todosType = {
  _id: string;
  taskName: string;
  taskStatus: string;
  __v: Number;
};

export type todosFilterType = "all" | "completed" | "active";

const Todos = () => {
  const [todoName, setTodoName] = useState<string>("");
  const [todos, setTodos] = useState<Array<todosType>>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<Boolean>(true);
  const [selectedTodosFilter, setSelectedTodosFilter] =
    useState<todosFilterType>("all");

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const allTodos = (await getAllTodosAPI()) as Array<todosType>;
      setTodos(allTodos);
      setIsLoadingTodos(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTodoName = (todoName: string) => {
    setTodoName(todoName);
  };

  const addTodo = async () => {
    try {
      const payload = {
        taskName: todoName,
        taskStatus: "active",
      };
      const addedTodo = await addTodoAPI(payload);

      if (addedTodo?.data?.error === false) {
        setTodos([...todos, addedTodo?.data?.body]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateTodo = async (todo: todosType) => {
    try {
      const payload = {
        taskStatus: todo.taskStatus === "active" ? "completed" : "active",
      };

      const updatedTodo = await updateTodoAPI(todo._id, payload);

      if (!updatedTodo?.data?.error) {
        const modifiedTodos = todos.map((todoElms) => {
          if (todoElms._id === todo._id) {
            return updatedTodo?.data?.body;
          }
          return todoElms;
        });
        setTodos(modifiedTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTodo = async (todoId: string) => {
    try {
      const deletedTodo = await deleteTodoAPI(todoId);
      if (!deletedTodo?.data?.error) {
        const restTodos = todos.filter((todo) => todo._id !== todoId);
        setTodos(restTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todos mt-5 mx-auto">
      <TodoInput
        todoName={todoName}
        onChangeTodoName={onChangeTodoName}
        addTodo={addTodo}
      />

      <Stack className="todos-list-section mx-auto">
        <Stack className="filter-section mt-5 " direction="horizontal">
          <Button className="filter-title border-0 px-5">Filter</Button>
          <Stack
            direction="horizontal"
            className="ms-3 w-100 justify-content-evenly"
          >
            <Stack className="filter-option-btn-wrapper justify-content-center px-3">
              <Button
                className={`filter-option-btn ${
                  selectedTodosFilter === "all" ? "btn-active" : ""
                } border-0`}
                variant="light"
                onClick={() => setSelectedTodosFilter("all")}
              >
                All
              </Button>
            </Stack>
            <Stack className="filter-option-btn-wrapper justify-content-center px-3">
              <Button
                className={`filter-option-btn ${
                  selectedTodosFilter === "completed" ? "btn-active" : ""
                } border-0`}
                variant="light"
                onClick={() => setSelectedTodosFilter("completed")}
              >
                Completed
              </Button>
            </Stack>
            <Stack className="filter-option-btn-wrapper justify-content-center px-3">
              <Button
                className={`filter-option-btn ${
                  selectedTodosFilter === "active" ? "btn-active" : ""
                } border-0`}
                variant="light"
                onClick={() => setSelectedTodosFilter("active")}
              >
                Active
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack className="todosList mt-5">
          {isLoadingTodos ? (
            <div>Loading</div>
          ) : todos?.length > 0 ? (
            todos?.map((todo, index) =>
              selectedTodosFilter === "all" ||
              todo.taskStatus === selectedTodosFilter ? (
                <TodosList
                  key={`todo.${index}`}
                  todo={todo}
                  onUpdateTodo={onUpdateTodo}
                  onDeleteTodo={onDeleteTodo}
                />
              ) : (
                <></>
              )
            )
          ) : (
            <>No todos added</>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default Todos;
