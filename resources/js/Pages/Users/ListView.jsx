import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";
import List from "@/Components/List";
import { Head } from "@inertiajs/react";
import Search from "@/Components/Search";


export default function UsersListView({ auth, users }) {
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'lastname', label: 'Lastname' },
    { name: 'email', label: 'Email' },
    { name: 'organization.name', label: 'Organization' },
    { name: 'roles[0].display_name', label: 'Role' }
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xlß leading-tight`}>Users</h2>}
    >
      <Head title="Users" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6`}>Users</div>
            <Search />
            <div className={`m-auto mr-4`}>
              {auth.permissions.find((permission => permission.name === 'create_users')) &&
                <a href={route('user.create')} className={`${textMain} text-3xl`}>
                  <BiPlus>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {users &&
            <>
              <Pagination className={`mt-6`} links={users.links} />
              <List
                auth={auth}
                data={users.data}
                editRoute={'user.edit'}
                fields={fields}
                permission_name={'users'}
              />
              <Pagination className={`mt-6`} links={users.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}