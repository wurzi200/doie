
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Todo from "./todo";

export default function TodoList({ todos }) {
  return (
    todos.map((todo, i) => {
      return (
        <Todo todo={todo} key={i}></Todo>
      );
    })
  );
}