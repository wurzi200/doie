import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateUserInformation from './Partials/CreateUserForm';
import { backgroundSecondary, textMain } from '@/Constants';

export default function Create({ auth, mustVerifyEmail, status, user, organizations, roles }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Profile</h2>}
    >
      <Head title="Profile" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6`}>
          <div>
            <CreateUserInformation
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className={`w-full`}
              user={user}
              organizations={organizations}
              roles={roles}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}