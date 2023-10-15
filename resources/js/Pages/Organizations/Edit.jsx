import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateOrganizationForm from './Partials/UpdateOrganizationForm';
import { backgroundSecondary, textMain } from '@/constants';

export default function Edit({ auth, organization }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xl leading-tight`}>Edit Organization: {organization.name}</h2>}
    >
      <Head title="Edit Organization" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8`}>
          <div className={`overflow-hidden shadow-sm sm:rounded-lg flex`}>
          </div>
          <UpdateOrganizationForm
            organization={organization}
          />
        </div>
      </div>

    </AuthenticatedLayout >
  );
}