import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { backgroundSecondary, textMain } from '@/Constants';
import CreateCustomerInformation from './Partials/CreateCustomerInformation';
import { Head } from '@inertiajs/react';
import UpdateCustomerInformation from './Partials/UpdateCustomerInformation';

export default function Edit({ auth, customer }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Edit Customer</h2>}
    >
      <Head title="Customers" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6`}>
          <div>
            <UpdateCustomerInformation
              className={`w-full`}
              auth={auth}
              customer={customer}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}