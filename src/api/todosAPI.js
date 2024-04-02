import { publicInstance } from "../config/axios";

export const getAllTodosAPI = async () => {
  try {
    const todos = await publicInstance.get("/todos/get-all");
    return todos?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoAPI = async (payload) => {
  try {
    const addedTodo = await publicInstance.post("/todos/add", payload);
    return addedTodo;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoAPI = async (todoId, payload) => {
  try {
    const updatedTodo = await publicInstance.put(`/todos/${todoId}`, payload);
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoAPI = async (todoId) => {
  try {
    const deletedTodo = await publicInstance.delete(`/todos/${todoId}`);
    return deletedTodo;
  } catch (error) {
    console.log(error);
  }
};
