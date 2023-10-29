import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SearchableDropdown from '@/Components/SearchableDropdown';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';

export default function CreateUserInformation({ organizations, roles, user }) {

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    name: '',
    lastname: '',
    email: '',
    organization_id: user.organization_id,
    role: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();

    put(route('user.store'));
  };

  return (
    <form onSubmit={submit} className={`mt-6 space-y-6`}>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>Create a new User</h2>

          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            User details
          </p>
        </header>
        <div className={`flex flex-wrap md:flex-nowrap`}>
          <div className={`w-full md:mr-4`}>
            <div className={`mb-4`}>
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                type="email"
                className={`mt-1 block w-full`}
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoComplete="email"
              />

              <InputError className={`mt-2`} message={errors.email} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor="name" value="Firstname" />

              <TextInput
                id="name"
                className={`mt-1 block w-full`}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="given-name"
              />

              <InputError className={`mt-2`} message={errors.name} />
            </div>

            <div className={`mb-4`}>
              <InputLabel htmlFor="lastname" value="Lastname" />

              <TextInput
                id="lastname"
                className={`mt-1 block w-full`}
                value={data.lastname}
                onChange={(e) => setData('lastname', e.target.value)}
                required
                isFocused
                autoComplete="family-name"
              />

              <InputError className={`mt-2`} message={errors.lastname} />
            </div>
            <div className={`md:flex`}>
              <div className={`w-full md:mr-2`}>
                <div className={`mb-4`}>
                  <InputLabel htmlFor="password" value="Password" />

                  <TextInput
                    id="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className={`mt-1 block w-full`}
                    autoComplete="new-password"
                  />

                  <InputError message={errors.password} className={`mt-2`} />
                </div>

                <div className={`mb-4`}>
                  <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                  <TextInput
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    type="password"
                    className={`mt-1 block w-full`}
                    autoComplete="new-password"
                  />

                  <InputError message={errors.password_confirmation} className={`mt-2`} />
                </div>
              </div>
              <div className={`w-full md:ml-2`}>
                <div className={`mb-4`}>
                  <InputLabel htmlFor="organization" value="Organization" />

                  <SearchableDropdown
                    name={`name`}
                    options={organizations}
                    onChange={(e) => setData('organization_id', e.id)}
                    defaultId={data.organization_id}
                  />

                  <InputError className={`mt-2`} message={errors.organozation_id} />
                </div>
                <div className={`mb-4`}>
                  <InputLabel htmlFor="role" value="Role" />

                  <SearchableDropdown
                    name={`display_name`}
                    options={roles && roles}
                    onChange={(e) => setData('role', e.name)}
                    defaultId={data.role.id && data.role.id}
                  />

                  <InputError className={`mt-2`} message={errors.role} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-4 mt-4`}>
          <PrimaryButton disabled={processing}>Create</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter={`transition ease-in-out`}
            enterFrom={`opacity-0`}
            leave={`transition ease-in-out`}
            leaveTo={`opacity-0`}
          >
            <p className={`text-sm ${textSecondary}`}>Created.</p>
          </Transition>
        </div>
      </section>
    </form >
  );
}