import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateOrganizationForm from './Partials/UpdateOrganizationForm';
import { backgroundSecondary, border, textMain, textSecondary } from '@/constants';
import ImageUpload from '@/Components/ImageUpload';
import LogoUploadForm from './Partials/LogoUploadForm';
import UpdateIdentificationdataForm from './Partials/UpdateIdentificationdataForm';
import Create from '../CalculationTypes/Create';
import CreateAddressInformation from '../Addresses/CreateAddressInformation';
import EditableList from '@/Components/EditableList';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, organization, types, logoUrl }) {
  const addressFields = [
    { name: 'street', label: 'Street', required: true },
    { name: 'postal_code', label: 'Postal', required: true },
    { name: 'city', label: 'City', required: true },
    { name: 'country', label: 'Country', required: true },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`${textMain} font-semibold text-xl leading-tight`}>Edit Organization: {organization.name}</h2>}
    >
      <Head title="Edit Organization" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
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
              <section className={`mt-4 p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
                <header>
                  <h2 className={`text-lg font-medium ${textMain}`}>Addresses</h2>
                  <div className='flex justify-between'>
                    <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>Add or Change the Addresses</p>
                    <div className='flex justify-end'>
                      <PrimaryButton
                        onClick={handleModalOpen}
                      >
                        Add Address
                      </PrimaryButton>
                    </div>
                  </div>
                </header>
                <CreateAddressInformation
                  id={organization.id}
                  type={'organization'}
                  fields={addressFields}
                  isOpen={isModalOpen}
                  onClose={handleClose}
                />
                <EditableList
                  auth={auth}
                  data={organization.addresses}
                  editRoute={'address.edit'}
                  deleteRoute={'address.delete'}
                  fields={addressFields}
                  permission_name={'organization_addresses'}
                />
              </section>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout >
  );
}