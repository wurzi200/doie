import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateOrganizationInformation from './Partials/CreateOrganizationForm';

export default function Create({ auth, user }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Organization</h2>}
    >
      <Head title="Create Organization" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div>
            <CreateOrganizationInformation
              user={user}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
