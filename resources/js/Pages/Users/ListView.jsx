import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useRemember } from "@inertiajs/react";
import UsersList from "./UsersList";
import { BiUserPlus } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";


export default function UsersListView({ auth, users }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
    >
      <Head title="Users" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} ${textMain} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6`}>Users</div>
            <Search />
            <div className={`m-auto mr-4`}>
              {auth.permissions.find((permission => permission.name === 'create_users')) &&
                <a href={route('user.create')} className={`text-gray-600`}>
                  <BiUserPlus className={`${textMain} text-3xl`}>+</BiUserPlus>
                </a>
              }
            </div>
          </div>
          {users &&
            <>
              <Pagination className={`mt-6`} links={users.links} />
              <UsersList auth={auth} users={users}></UsersList>
              <Pagination className={`mt-6`} links={users.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}