
import Checkbox from "@/Components/Checkbox";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

import { BiTrash } from "react-icons/bi";



export default function Todo({ todo }) {
  function updateTodo() {

    const data = {
      id: todo.id,
      status: todo.status
    }

    axios.post('/updateTodo', data)
      .then(
        router.reload(),
        window.location.reload(),
      )
      .catch(error => {
        console.log("ERROR:: ", error.response.data);
      });
  }

  function deleteTodo() {
    const data = {
      id: todo.id
    }

    axios.post('/deleteTodo', data)
      .then(
        router.reload()
      )
      .catch(error => {
        console.log("ERROR:: ", error.response.data);
      });
  }

  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg m-3 flex">
      <Checkbox
        className="m-4 h-10 w-14"
        defaultChecked={todo.status === 'done' ? true : false}
        onChange={() => updateTodo()}
      />
      <div className="p-6 text-gray-900 w-full overflow-hidden">
        {todo.status === 'done' ? <s>{todo.description}</s> : todo.description}
      </div>
      <SecondaryButton
        className={"m-4 border-none shadow-none"}
        onClick={() => deleteTodo()}
      >
        <BiTrash className="text-2xl" />
      </SecondaryButton>
    </div>
  );
}