import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain } from "@/constants";
import List from "@/Components/List";

export default function CalculationsListView({ auth, calculations }) {
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'description', label: 'Description' },
    { name: 'result', label: 'Result' }
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl leading-tight ${textMain}`}>Calculations</h2>}
    >
      <Head title="Calculations" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`p-6 ${textMain}`}>Calculations</div>
            {auth.user.roles.find((role => role.name === 'super-admin-1')) && <Search />}
            <div className="m-auto mr-4">
              {auth.user.roles.find((role => role.name === 'super-admin-1')) &&
                <a href={route('calculation.create')} className="">
                  <BiPlus className={`text-3xl ${textMain}`}>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {calculations &&
            <>
              <Pagination class={`mt-6`} links={calculations.links} />
              <List
                auth={auth}
                data={calculations.data}
                editRoute={'calculation.edit'}
                deleteRoute={'calculation.destroy'}
                fields={fields}
                permission_name={'calculations'}
              />
              <Pagination class={`mt-6`} links={calculations.links} />
            </>
          }

        </div>
      </div>

    </AuthenticatedLayout>
  );
}