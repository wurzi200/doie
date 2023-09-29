
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import TodoList from "./todoList";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import axios from "axios";

export default function All({ auth, todos }) {
  const [toDoDescription, settoDoDescription] = useState('');

  function addNewTodo() {
    const data = {
      description: toDoDescription
    }

    axios.post('/addTodo', data)
      .then(
        settoDoDescription(''),
        router.reload(),
        window.location.reload(),
      )
      .catch(error => {
        console.log("ERROR:: ", error.response.data);
      });
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={< h2 className="font-semibold text-xl text-gray-800 leading-tight" > JUST DO IT</h2 >}
    >
      <Head title="All ToDos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
            <div className="p-6 text-gray-900 w-full">ToDo´s</div>
            <TextInput
              className={"m-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"}
              placeholder={"Do Joe Mama"}
              value={toDoDescription}
              onChange={(e) => settoDoDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNewTodo()
                }
              }}
            />
            <PrimaryButton
              className={"m-4"}
              onClick={() => addNewTodo()}
            >
              add
            </PrimaryButton>
          </div>
          <TodoList todos={todos} />
        </div>
      </div>

    </AuthenticatedLayout >
  );
}