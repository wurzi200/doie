import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import RoleList from "./RoleList";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";


export default function UsersListView({ auth, roles }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xlß leading-tight`}>Roles</h2>}
    >
      <Head title="Roles" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6 w-full`}>Roles</div>
            <div className={`m-auto mr-4`}>
              {auth.permissions.find((permission => permission.name === 'create_roles')) &&
                <a href={route('role.create')} className={`${textMain} text-3xl`}>
                  <BiPlus>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {roles &&
            <>
              <Pagination className={`mt-6`} links={roles.links} />
              <RoleList auth={auth} roles={roles}></RoleList>
              <Pagination className={`mt-6`} links={roles.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}