import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateOrganizationForm from './Partials/UpdateOrganizationForm';
import { textMain } from '@/constants';
import ImageUpload from '@/Components/ImageUpload';
import LogoUploadForm from './Partials/LogoUploadForm';

export default function Edit({ auth, organization, logoUrl }) {
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
          <div className='flex flex-wrap md:flex-nowrap'>
            <div className='w-full md:w-1/3'>
              <LogoUploadForm
                organization={organization}
                logoUrl={logoUrl}
              />
            </div>
            <div className='p-2' />
            <div className='w-full md:w-2/3'>
              <UpdateOrganizationForm
                organization={organization}
              />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout >
  );
}