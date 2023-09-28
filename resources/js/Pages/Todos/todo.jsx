
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import axios from "axios";

import { BiTrash } from "react-icons/bi";



export default function Todo({ todo }) {

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
      <div className="p-6 text-gray-900 w-full overflow-hidden">{todo.description}</div>
      <SecondaryButton
        className={"m-4 border-none shadow-none"}
        onClick={() => deleteTodo()}
      >
        <BiTrash className="text-2xl" />
      </SecondaryButton>
    </div>
  );
}