import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateCalculationForm from './Partials/CreateCalculationForm';

export default function Create({ auth, mustVerifyEmail, status, user, organizations, roles, calculationTypes }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Create a new Calculation</h2>}
    >
      <Head title="Create a new Calculation" />

      <div className="py-8">
        <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
          <div>
            <CreateCalculationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="w-full"
              user={user}
              organizations={organizations}
              roles={roles}
              calculationTypes={calculationTypes}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
