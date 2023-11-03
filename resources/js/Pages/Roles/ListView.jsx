import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";
import List from "@/Components/List";
import { Head } from "@inertiajs/react";
import Search from "@/Components/Search";


export default function RoleListView({ auth, roles }) {
  const fields = [
    { name: 'display_name', label: 'Name' },
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xlß leading-tight`}>Roles</h2>}
    >
      <Head title="Roles" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6`}>Roles</div>
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
              <List
                auth={auth}
                data={roles.data}
                editRoute={'role.edit'}
                deleteRoute={'role.delete'}
                fields={fields}
                permission_name={'roles'}
                searchable
              />
              <Pagination className={`mt-6`} links={roles.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}