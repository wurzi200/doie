
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import UsersList from "./UsersList";
import { BiUserPlus } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import axios from "axios";


export default function UsersListView({ auth, users }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    router.get(
      route(route().current()),
      { search: searchTerm },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
            <div className="p-6 text-gray-900">Users</div>
            <TextInput
              className="m-4"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <PrimaryButton className="my-4" onClick={handleSearch}>
              Search
            </PrimaryButton>
            <div className="m-auto mr-4">
              {auth.permissions.find((permission => permission.name === 'create_users')) &&
                <a href={route('user.create')} className="text-gray-600">
                  <BiUserPlus className="text-3xl">+</BiUserPlus>
                </a>
              }
            </div>
          </div>
          {users &&
            <>
              <Pagination class="mt-6" links={users.links} />
              <UsersList auth={auth} users={users}></UsersList>
              <Pagination class="mt-6" links={users.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}