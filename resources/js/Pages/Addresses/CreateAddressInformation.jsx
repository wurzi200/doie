import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';
import { useForm } from '@inertiajs/react';
import Select from '@/Components/Select';
import SearchableDropdown from '@/Components/SearchableDropdown';
import { HiX } from 'react-icons/hi';

export default function CreateAddressInformation({ id, type, countries, fields, isOpen, onClose }) {
  const { data, setData, put, errors, processing, recentlySuccessful } = useForm(fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {}));

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('address.store', { id, type }), {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 mt-80 overflow-hidden"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
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
              className={`${backgroundSecondary} ${textMain} ${border} border inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl`}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6"
              >
                Create a new Address
              </Dialog.Title>

              <div className="mt-2">
                <form onSubmit={handleSubmit} className={`space-y-6`}>
                  <div className={`flex flex-wrap md:flex-nowrap`}>
                    {fields.map((field) => (
                      <div className={`mb-4 w-full mr-4`} key={field.name}>
                        <InputLabel htmlFor={field.name} value={field.label} />

                        <TextInput
                          id={field.name}
                          className={`mt-1 block w-full`}
                          value={data[field.name]}
                          onChange={(e) => setData(field.name, e.target.value)}
                          required={field.required}
                          isFocused={field.isFocused}
                        />

                        <InputError className={`mt-2`} message={errors[field.name]} />
                      </div>
                    ))}
                  </div>
                  <div className={`flex items-center gap-4 mt-4`}>
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>

                    {recentlySuccessful && (
                      <p className={`text-sm ${textSecondary}`}>Created.</p>
                    )}
                  </div>
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