import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain } from "@/constants";
import List from "@/Components/List";

export default function OrganizationListView({ auth, organizations }) {
  const fields = [
    { name: 'name', label: 'Name' },
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl leading-tight ${textMain}`}>Organizations</h2>}
    >
      <Head title="Organizations" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`p-6 ${textMain}`}>Organizations</div>
            {auth.user.roles.find((role => role.name === 'super-admin-1')) && <Search />}
            <div className="m-auto mr-4">
              {auth.user.roles.find((role => role.name === 'super-admin-1')) &&
                <a href={route('organization.create')} className="">
                  <BiPlus className={`text-3xl ${textMain}`}>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {organizations &&
            <>
              <Pagination class={`mt-6`} links={organizations.links} />
              <List auth={auth}
                data={organizations.data}
                editRoute={'organization.edit'}
                deleteRoute={'organization.delete'}
                fields={fields}
                permission_name={'organizations'}
              />
              <Pagination class={`mt-6`} links={organizations.links} />
            </>
          }

        </div>
      </div>

    </AuthenticatedLayout>
  );
}