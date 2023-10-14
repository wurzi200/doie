import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateCalculationTypeInformation from './Partials/CreateCalculationTypeForm';
import { textMain } from '@/Constants';

export default function Create({ auth }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Create Calculation Type</h2>}
    >
      <Head title="Create Calculation Type" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6`}>
          <div>
            <CreateCalculationTypeInformation
              className={`w-full`}
              auth={auth}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}