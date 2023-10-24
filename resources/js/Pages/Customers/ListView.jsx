import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";
import List from "@/Components/List";
import { Head } from "@inertiajs/react";
import Search from "@/Components/Search";


export default function CustomersListView({ auth, customers }) {
  const fields = [
    { name: 'first_name', label: 'Name' },
    { name: 'last_name', label: 'Lastname' },
    { name: 'email', label: 'Email' },
    { name: 'number', label: 'Number' },
    { name: 'gender.name', label: 'Gender' },
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xlß leading-tight`}>Customers</h2>}
    >
      <Head title="Customers" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6`}>Customers</div>
            <Search />
            <div className={`m-auto mr-4`}>
              {auth.permissions.find((permission => permission.name === 'create_customers')) &&
                <a href={route('customer.create')} className={`${textMain} text-3xl`}>
                  <BiPlus>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {customers &&
            <>
              <Pagination className={`mt-6`} links={customers.links} />
              <List
                auth={auth}
                data={customers.data}
                editRoute={'customer.edit'}
                deleteRoute={'customer.delete'}
                fields={fields}
                permission_name={'customers'}
              />
              <Pagination className={`mt-6`} links={customers.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}