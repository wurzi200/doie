import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';
import { TextInput } from 'flowbite-react';
import { HiReceiptTax } from 'react-icons/hi';

export default function UpdateIdentificationdataForm({ organization }) {
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    commercial_register_number: organization.commercial_register_number ? organization.commercial_register_number : '',
    tax_number: organization.tax_number ? organization.tax_number : '',
    vat_id: organization.vat_id ? organization.vat_id : '',
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route('organization.update', organization.id));
  };

  return (
    <form onSubmit={submit} className={`space-y-6`}>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>Identification Data</h2>
          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>Change the Identification Data</p>
        </header>
        <div className={`flex flex-wrap md:flex-nowrap`}>
          <div className={`w-full md:mr-4`}>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`commercial_register_number`} value={`Commercial Register Number`} />
              <TextInput
                id={`commercial_register_number`}
                type={`text`}
                className={`mt-1 block w-full`}
                value={data.commercial_register_number}
                onChange={(e) => setData('commercial_register_number', e.target.value)}
                autoComplete={`commercial_register_number`}
              />
              <InputError className={`mt-2`} message={errors.commercial_register_number} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`tax_number`} value={`Tax Number`} />
              <TextInput
                id={`tax_number`}
                type={`text`}
                className={`mt-1 block w-full`}
                value={data.tax_number}
                onChange={(e) => setData('tax_number', e.target.value)}
                autoComplete={`tax_number`}
              />
              <InputError className={`mt-2`} message={errors.tax_number} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`vat_id`} value={`VAT ID`} />
              <TextInput
                id={`vat_id`}
                type={`text`}
                className={`mt-1 block w-full`}
                value={data.vat_id}
                onChange={(e) => setData('vat_id', e.target.value)}
                autoComplete={`vat_id`}
              />
              <InputError className={`mt-2`} message={errors.vat_id} />
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-4 mt-4`}>
          <PrimaryButton disabled={processing}>Save</PrimaryButton>
          <Transition
            show={recentlySuccessful}
            enter={`transition ease-in-out`}
            enterFrom={`opacity-0`}
            leave={`transition ease-in-out`}
            leaveTo={`opacity-0`}
          >
            <p className={`text-sm ${textSecondary}`}>Saved</p>
          </Transition>
        </div>
      </section>
    </form>
  );
}