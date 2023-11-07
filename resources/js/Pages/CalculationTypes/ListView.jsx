import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain } from "@/constants";
import List from "@/Components/List";

export default function CalculationTypeListView({ auth, calculationTypes }) {
  const fields = [
    { name: 'name', label: 'Name' }
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl leading-tight ${textMain}`}>Calculation Types</h2>}
    >
      <Head title="Calculation Types" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`p-6 ${textMain}`}>Calculation Types</div>
            <div className="m-auto mr-4">
              {auth.permissions.find((permission => permission.name === 'create_calculation_types')) &&
                <a href={route('calculationType.create')} className="">
                  <BiPlus className={`text-3xl ${textMain}`}>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {calculationTypes &&
            <>
              <List
                searchable
                auth={auth}
                data={calculationTypes.data}
                editRoute={'calculationType.edit'}
                deleteRoute={'calculationType.destroy'}
                fields={fields}
                permission_name={'calculation_types'}
              />
              <Pagination class={`mt-6`} links={calculationTypes.links} />
            </>
          }

        </div>
      </div>

    </AuthenticatedLayout>
  );
}