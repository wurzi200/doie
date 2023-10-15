import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateRoleInformation from './Partials/CreateRoleForm';
import { textMain } from '@/constants';

export default function Create({ auth, mustVerifyEmail, status, user, organizations }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xl leading-tight`}>Create a Role</h2>}
    >
      <Head title="Create a Role" />

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
