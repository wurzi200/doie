
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UsersList from "./UsersList";
import { AiOutlineUserAdd } from "react-icons/ai";
import Pagination from "@/Components/Pagination";


export default function UsersListView({ auth, users }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" > Users</h2 >}
    >
      <Head title="All ToDos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
            <div className="p-6 text-gray-900">Users</div>
            <div className="w-full p-4">
            </div>
            <div className="m-auto mr-4">
              <a href={route('user.create')} className="">
                <AiOutlineUserAdd className="text-3xl">+</AiOutlineUserAdd>
              </a>
            </div>
          </div>
          <Pagination class="mt-6" links={users.links} />
          {users && <UsersList users={users}></UsersList>}
          <Pagination class="mt-6" links={users.links} />
        </div>
      </div>

    </AuthenticatedLayout >
  );
}