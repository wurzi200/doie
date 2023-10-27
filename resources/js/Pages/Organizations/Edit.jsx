import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateOrganizationForm from './Partials/UpdateOrganizationForm';
import { textMain } from '@/constants';
import ImageUpload from '@/Components/ImageUpload';
import LogoUploadForm from './Partials/LogoUploadForm';
import UpdateIdentificationdataForm from './Partials/UpdateIdentificationdataForm';

export default function Edit({ auth, organization, types, logoUrl }) {
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
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/3'>
              <div className='w-full mt-6'>
                <LogoUploadForm
                  organization={organization}
                  logoUrl={logoUrl}
                />
              </div>
              <div className='mt-4 '>
                <UpdateIdentificationdataForm
                  organization={organization}
                  types={types}
                />
              </div>
            </div>
            <div className='w-full md:w-2/3 pl-4'>
              <div className='mt-6'>
                {/* <UpdateOrganizationForm
                  organization={organization}
                  types={types}
                /> */}
              </div>
              <div className='mt-4'>
                <UpdateOrganizationForm
                  organization={organization}
                  types={types}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout >
  );
}