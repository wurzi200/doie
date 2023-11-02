import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain } from "@/constants";
import List from "@/Components/List";

export default function OrganizationListView({ auth, organizations, organization_types }) {
  const fields = [
    { name: 'name', label: 'Name', sortable: true },
    { name: 'organization_type.name', label: 'Type' },
    { name: 'email', label: 'Email', sortable: true },
    { name: 'website', label: 'Website', type: 'link', sortable: true },
    { name: 'establishment_date', label: 'Establishment Date', sortable: true, type: 'date' },
  ];

  const filters = [
    { name: 'organization_type', label: 'Types', data: organization_types, type: 'select' },
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
            {/* {auth.user.roles.find((role => role.name === 'super-admin-1')) && <Search />} */}
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
                fields={fields}
                data={organizations.data}
                filters={filters}
                editRoute={'organization.edit'}
                deleteRoute={'organization.delete'}
                permission_name={'organizations'}
                searchable
              />
              <Pagination class={`mt-6`} links={organizations.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout>
  );
}