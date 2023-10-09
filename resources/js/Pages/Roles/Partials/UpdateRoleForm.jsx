import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SearchableDropdown from '@/Components/SearchableDropdown';

export default function UpdateRoleForm({ role, organization }) {

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: role.display_name,
    organization_id: organization.id,
  });

  const submit = (e) => {
    e.preventDefault();

    patch(route('role.update', role.id));
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <header>
          <h2 className="text-lg font-medium text-gray-900">Update Role</h2>

          <p className="mt-1 mb-4 text-sm text-gray-600">
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
          </div>
        </div >
        <div className="flex items-center gap-4 mt-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </section >
    </form >
  );
}
