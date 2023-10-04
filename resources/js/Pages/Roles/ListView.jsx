
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import RoleList from "./RoleList";
import Pagination from "@/Components/Pagination";
import { AiOutlineUserAdd } from "react-icons/ai";


export default function UsersListView({ auth, roles }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={< h2 className="font-semibold text-xl text-gray-800 leading-tight" > Roles</h2 >}
    >
      <Head title="All ToDos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
            <div className="p-6 text-gray-900 w-full">Roles</div>
            <div className="m-auto mr-4">
              <a href={route('role.create')} className="">
                <AiOutlineUserAdd className="text-3xl">+</AiOutlineUserAdd>
              </a>
            </div>
          </div>
          {roles &&
            <>
              <Pagination class="mt-6" links={roles.links} />
              <RoleList roles={roles}></RoleList>
              <Pagination class="mt-6" links={roles.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}