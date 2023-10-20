import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';
import { Head, useForm } from '@inertiajs/react';

export default function CreateCustomerInformation({ auth }) {
  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    number: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('customer.store'));
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-6 space-y-6`}>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>Create a new Customer</h2>

          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            Customer details
          </p>
        </header>
        <div className={`flex flex-wrap md:flex-nowrap`}>
          <div className={`w-full md:mr-4`}>
            <div className='flex'>
              <div className={`mb-4 w-full`}>
                <InputLabel htmlFor="first_name" value="First Name" />

                <TextInput
                  id="first_name"
                  className={`mt-1 block w-full`}
                  value={data.first_name}
                  onChange={(e) => setData('first_name', e.target.value)}
                  required
                  isFocused
                />

                <InputError className={`mt-2`} message={errors.first_name} />
              </div>
              <div className='p-2'></div>
              <div className={`mb-4 w-full`}>
                <InputLabel htmlFor="last_name" value="Last Name" />

                <TextInput
                  id="last_name"
                  className={`mt-1 block w-full`}
                  value={data.last_name}
                  onChange={(e) => setData('last_name', e.target.value)}
                  required
                />

                <InputError className={`mt-2`} message={errors.last_name} />
              </div>
            </div>
            <div className='flex'>
              <div className={`mb-4 w-full`}>
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
              <div className='p-2'></div>
              <div className={`mb-4 w-full`}>
                <InputLabel htmlFor="number" value="Number" />

                <TextInput
                  id="number"
                  className={`mt-1 block w-full`}
                  value={data.number}
                  onChange={(e) => setData('number', e.target.value)}
                  required
                />

                <InputError className={`mt-2`} message={errors.number} />
              </div>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-4 mt-4`}>
          <PrimaryButton disabled={processing}>Create</PrimaryButton>

          {recentlySuccessful && (
            <p className={`text-sm ${textSecondary}`}>Created.</p>
          )}
        </div>
      </section>
    </form>
  );
}