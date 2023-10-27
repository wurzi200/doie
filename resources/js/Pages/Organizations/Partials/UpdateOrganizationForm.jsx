import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SearchableDropdown from '@/Components/SearchableDropdown';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';
import { TextInput, Datepicker } from 'flowbite-react';
import { getFirstDateInRange } from 'flowbite-react/lib/esm/components/Datepicker/helpers';
import { HiArrowNarrowDown, HiAtSymbol, HiHome, HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';


export default function UpdateOrganizationForm({ organization, types }) {

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: organization.name ? organization.name : '',
    type: organization.type ? organization.type : '',
    email: organization.email ? organization.email : '',
    website: organization.website ? organization.website : '',
    establishment_date: organization.establishment_date ? organization.establishment_date : getFirstDateInRange(),
  });

  console.log(data.establishment_date);

  function getFirstDateInRange() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const formattedDate = firstDayOfYear.toISOString().slice(0, 10);
    return formattedDate;
  }

  const submit = (e) => {
    e.preventDefault();

    patch(route('organization.update', organization.id));
  };

  return (
    <form onSubmit={submit} className={`mt-6 space-y-6`}>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>{organization.name}</h2>

          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            Organization details
          </p>
        </header>
        <div className={`flex flex-wrap md:flex-nowrap`}>
          <div className={`w-full md:mr-4`}>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`name`} value={`Name`} />

              <TextInput
                id={`name`}
                type={`text`}
                className={`mt-1 block w-full`}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                autoComplete={`name`}
                required
              />

              <InputError className={`mt-2`} message={errors.name} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`type`} value={`Type`} />

              <SearchableDropdown
                id={`type`}
                name={`type`}
                defaultId={data.type}
                onChange={(e) => setData('type', e.id)}
                options={types}
              />

              <InputError className={`mt-2`} message={errors.type} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`email`} value={`Email`} />

              <TextInput
                id={`email`}
                type={`email`}
                className={`mt-1 block w-full`}
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                autoComplete={`email`}
                icon={HiAtSymbol}
              />

              <InputError className={`mt-2`} message={errors.email} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`website`} value={`Website`} />

              <TextInput
                id={`website`}
                type={`text`}
                className={`mt-1 block w-full`}
                value={data.website}
                onChange={(e) => setData('website', e.target.value)}
                autoComplete={`website`}
                icon={HiHome}
              />

              <InputError className={`mt-2`} message={errors.website} />
            </div>
            <div className={`mb-4`}>
              <InputLabel htmlFor={`establishment_date`} value={`Establishment Date`} />

              <Datepicker
                id={`establishment_date`}
                name={`establishment_date`}
                onSelectedDateChanged={(value) => setData('establishment_date', value)}
                defaultDate={new Date(data.establishment_date)}
                language='de'
                showClearButton={false}
              />

              <InputError className={`mt-2`} message={errors.establishment_date} />
            </div>
          </div>
        </div >
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
      </section >
    </form >
  );
}