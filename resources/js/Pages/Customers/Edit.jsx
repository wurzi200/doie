import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';
import CreateCustomerInformation from './Partials/CreateCustomerInformation';
import { Head } from '@inertiajs/react';
import UpdateCustomerInformation from './Partials/UpdateCustomerInformation';
import List from '@/Components/List';
import EditableList from '@/Components/EditableList';
import CreateAddressInformation from '../Addresses/CreateAddressInformation';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, customer, genders }) {
  const addressFields = [
    { name: 'addressType', label: 'Type', required: true, },
    { name: 'street', label: 'Street', required: true },
    { name: 'houseNumber', label: 'HouseNumber', required: true },
    { name: 'postal_code', label: 'Postal', required: true },
    { name: 'city', label: 'City', required: true },
    { name: 'country', label: 'Country', required: true },
  ];

  const [editedItem, setEditedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEdit(item) {
    setEditedItem(item);
    handleModalOpen('secondModal');
  }

  const [modals, setModals] = useState({
    firstModal: false,
    secondModal: false,
    // Add more modals as needed
  });

  function handleModalOpen(modalName) {
    setModals(prevModals => ({
      ...prevModals,
      [modalName]: true
    }));
  }

  function handleModalClose(modalName) {
    setModals(prevModals => ({
      ...prevModals,
      [modalName]: false
    }));
  }

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Edit Customer</h2>}
    >
      <Head title="Customers" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6`}>
          <div className=''>
            <UpdateCustomerInformation
              className={`w-full`}
              auth={auth}
              customer={customer}
              genders={genders}
            />
            <div className='p-4' />
            <div className='w-full'>
              <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
                <header>
                  <h2 className={`text-lg font-medium ${textMain}`}>Customer Adresses</h2>

                  <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
                    A List of the Customers Adresses
                  </p>
                  <div className='flex justify-end'>
                    <PrimaryButton
                      onClick={() => handleModalOpen('firstModal')}
                    >
                      Add Address
                    </PrimaryButton>
                  </div>
                  <CreateAddressInformation
                    id={customer.id}
                    type={'customer'}
                    isOpen={modals.firstModal}
                    onClose={() => handleModalClose('firstModal')}
                  />
                </header>
                <>
                  <List
                    auth={auth}
                    data={customer.addresses}
                    handleEdit={handleEdit}
                    fields={addressFields}
                    permission_name={'customers'}
                    deleteRoute={'address.delete'}
                  />
                  <CreateAddressInformation
                    isEditMode={true}
                    isOpen={modals.secondModal}
                    type={'customer'}
                    item={editedItem}
                    onClose={() => handleModalClose('secondModal')}
                  />
                </>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}