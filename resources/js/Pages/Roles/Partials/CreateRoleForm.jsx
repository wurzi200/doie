import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SearchableDropdown from '@/Components/SearchableDropdown';

export default function CreateRoleInformation({ mustVerifyEmail, status, className = '', organizations, roles, user }) {

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    name: '',
    organization_id: '',
  });

  const submit = (e) => {
    e.preventDefault();

    put(route('role.store'));
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-6">
      <section className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <header>
          <h2 className="text-lg font-medium text-gray-900">Create a new User</h2>

          <p className="mt-1 mb-4 text-sm text-gray-600">
            User details
          </p>
        </header>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:mr-4">
            <div className="mb-4">
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                type="text"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>
            <div className="mb-4">
              <InputLabel htmlFor="organization" value="Organization" />

              <SearchableDropdown
                options={organizations}
                onChange={(e) => setData('organization_id', e.id)}
                defaultId={data.organization_id}
              />

              <InputError className="mt-2" message={errors.organozation_id} />
            </div>
          </div>
        </div >
        <div className="flex items-center gap-4 mt-4">
          <PrimaryButton disabled={processing}>Create</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Created.</p>
          </Transition>
        </div>
      </section >
    </form >
  );
}
