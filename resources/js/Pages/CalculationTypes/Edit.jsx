import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateCalculationType from './Partials/UpdateCalculationTypeForm';

export default function Edit({ auth, calculationType }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calculationtype: {calculationType.name}</h2>}
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <UpdateCalculationType
            calculationType={calculationType}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
