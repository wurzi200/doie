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
    { name: 'cost', label: 'Cost', type: 'currency' },
    { name: 'rate', label: 'rate', type: 'currency' },
    { name: 'special', label: 'special', type: 'currency' },
    { name: 'residual', label: 'residual', type: 'currency' },
    { name: 'interest', label: 'interest', type: 'percent' },
    { name: 'duration', label: 'duration' },
    { name: 'customer.first_name', label: 'Customer' },
    { name: 'customer.last_name', label: ' ' },

  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl leading-tight ${textMain}`}>Calculations</h2>}
    >
      <Head title="Calculations" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`p-6 ${textMain}`}>Calculations</div>
            <div className="m-auto mr-4">
              {auth.permissions.find((permission => permission.name === 'create_calculations')) &&
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
                printRoute={'calculation.print'}
                fields={fields}
                permission_name={'calculations'}
                searchable
              />
              <Pagination class={`mt-6`} links={calculations.links} />
            </>
          }

        </div>
      </div>

    </AuthenticatedLayout>
  );
}