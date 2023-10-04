import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateRoleInformation from './Partials/CreateRoleForm';

export default function Create({ auth, mustVerifyEmail, status, user, organizations }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Role</h2>}
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div>
            <CreateRoleInformation
              user={user}
              organizations={organizations}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}