import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";
import List from "@/Components/List";
import { Head } from "@inertiajs/react";


export default function CustomersListView({ auth, customers }) {
  const fields = ['first_name', 'email', 'number'];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xlß leading-tight`}>Customers</h2>}
    >
      <Head title="Customers" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6 w-full`}>Customers</div>
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
              <List auth={auth} data={customers.data} editRoute={'customer.edit'} deleteRoute={'customer.delete'} fields={fields}></List>
              <Pagination className={`mt-6`} links={customers.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}