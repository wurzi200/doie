import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { backgroundSecondary, border, textMain } from '@/Constants';
import { router, useForm } from '@inertiajs/react';
import { HiX } from 'react-icons/hi';
import Select from '@/Components/Select';
import { useEffect } from 'react';
import { useCallback } from 'react';

export default function CreateAddressInformation({ id, type, isOpen, onClose, isEditMode = false, item }) {
  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    addressType: '',
    street: '',
    houseNumber: '',
    postal_code: '',
    city: '',
    country: ''
  });

  const types = [
    { id: 1, name: 'comany', unavailable: false },
    { id: 2, name: 'billing', unavailable: false },
    { id: 3, name: 'delivery', unavailable: false },
  ]
  const setEditData = useCallback(setData, []);

  useEffect(() => {
    if (item) {
      setData({
        addressType: item.addressType,
        street: item.street,
        houseNumber: item.houseNumber,
        postal_code: item.postal_code,
        city: item.city,
        country: item.country
      });
    }
  }, [item, setEditData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      axios.post(`/address/${item.id}/edit`, data)
        .then(response => {
          router.reload();
          onClose();
        })
        .catch(error => {
        });
    } else {
      put(route('address.store', { id, type }), {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${backgroundSecondary} ${textMain} ${border} w-1/2 border inline-block p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl`}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6"
              >
                Create a new Address
              </Dialog.Title>

              <div className="mt-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-4 w-full mr-2">
                    <InputLabel htmlFor="addressType" value="Type" />
                    <Select
                      id="type"
                      options={types}
                      type="number"
                      className="mt-1 block w-full"
                      onChange={(e) => setData('addressType', e.name)}
                      selected={types.find(types => types.name === data.addressType)}
                      required
                    />
                    <InputError className="mt-2" message={errors.addressType} />
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap space-x-1">
                    <div className="flex-1 mb-4 mr-2">
                      <InputLabel htmlFor="street" value="Street" />
                      <TextInput
                        id="street"
                        className="mt-1 block w-full"
                        value={data.street}
                        onChange={(e) => setData('street', e.target.value)}
                        required
                      />
                      <InputError className="mt-2" message={errors.street} />
                    </div>

                    <div className="flex-1 mb-4 mr-2">
                      <InputLabel htmlFor="houseNumber" value="HouseNumber" />
                      <TextInput
                        id="houseNumber"
                        className="mt-1 block w-full"
                        value={data.houseNumber}
                        onChange={(e) => setData('houseNumber', e.target.value)}
                        required
                      />
                      <InputError className="mt-2" message={errors.houseNumber} />
                    </div>
                  </div>

                  <div className="mb-4 w-full mr-2">
                    <InputLabel htmlFor="postal_code" value="Postal" />
                    <TextInput
                      id="postal_code"
                      className="mt-1 block w-full"
                      value={data.postal_code}
                      onChange={(e) => setData('postal_code', e.target.value)}
                      required
                    />
                    <InputError className="mt-2" message={errors.postal_code} />
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap space-x-1">
                    <div className="flex-1 mb-4 mr-2">
                      <InputLabel htmlFor="city" value="City" />
                      <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        required
                      />
                      <InputError className="mt-2" message={errors.city} />
                    </div>

                    <div className="flex-1 mb-4 mr-2">
                      <InputLabel htmlFor="country" value="Country" />
                      <TextInput
                        id="country"
                        className="mt-1 block w-full"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        required
                      />
                      <InputError className="mt-2" message={errors.country} />
                    </div>
                  </div>

                  {isEditMode ? <div className="flex items-center gap-4 mt-4">
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>

                    {recentlySuccessful && (
                      <p className="text-sm text-secondary">Updated.</p>
                    )}
                  </div> : <div className="flex items-center gap-4 mt-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>

                    {recentlySuccessful && (
                      <p className="text-sm text-secondary">Created.</p>
                    )}
                  </div>}
                </form>
              </div>

              <button
                type="button"
                className="text-2xl absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                onClick={onClose}
              >
                <HiX />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}