import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { backgroundSecondary, textMain } from '@/Constants';
import CreateCustomerInformation from './Partials/CreateCustomerInformation';
import { Head } from '@inertiajs/react';

export default function Create({ auth, genders }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Customers</h2>}
    >
      <Head title="Customers" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6`}>
          <div>
            <CreateCustomerInformation
              className={`w-full`}
              auth={auth}
              genders={genders}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}