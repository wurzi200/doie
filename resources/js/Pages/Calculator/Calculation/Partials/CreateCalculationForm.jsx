import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { TextInput } from 'flowbite-react';

import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SearchableDropdown from '@/Components/SearchableDropdown';

import { backgroundSecondary, blockInvalidChar, border, textMain, textSecondary } from '@/constants';

import { PiCurrencyEurBold, PiPercentBold } from 'react-icons/pi';


export default function CreateCalculationForm({ organizations, roles, user }) {

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    cost: '',
    special: '',
    residual: '',
    duration: '',
    interest: '',
    type: '',
  });

  const submit = (e) => {
    e.preventDefault();

    put(route('user.store'));
  };

  return (
    <form onSubmit={submit} className={`space-y-6`}>
      <section className={`${backgroundSecondary} ${border} border lg:w-1/2 sm:p-8 shadow sm:rounded-lg`}>
        <header>
          <h2 className={`${textMain} text-lg font-medium`}>Calculation</h2>

          <p className={`${textSecondary} mt-1 mb-4 text-sm`}>
            Calculation details
          </p>
        </header>
        <div className={`flex flex-wrap md:flex-nowrap`}>
          <div className={`w-full md:mr-4`}>
            <div className={`lg:flex`}>
              <div className={`w-full md:mr-2`}>
                <div className={`mb-4`}>
                  <InputLabel htmlFor={`Cost`} value={`Cost`} />

                  <TextInput
                    id={`cost`}
                    type={`number`}
                    rightIcon={PiCurrencyEurBold}
                    className={`mt-1 block w-full`}
                    value={data.cost}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => setData('cost', e.target.value)}
                    required
                  />

                  <InputError className={`mt-2`} message={errors.cost} />
                </div>
                <div className={`mb-4`}>
                  <InputLabel htmlFor={`special`} value={`Special`} />

                  <TextInput
                    id={`special`}
                    type={`number`}
                    rightIcon={PiCurrencyEurBold}
                    className={`mt-1 block w-full`}
                    value={data.special}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => setData('special', e.target.value)}
                    required
                  />

                  <InputError className={`mt-2`} message={errors.special} />
                </div>

                <div className={`mb-4`}>
                  <InputLabel htmlFor={`residual`} value={`Residual`} />

                  <TextInput
                    id={`residual`}
                    type={`number`}
                    rightIcon={PiCurrencyEurBold}
                    className={`mt-1 block w-full`}
                    value={data.residual}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => setData('residual', e.target.value)}
                    required
                  />

                  <InputError className={`mt-2`} message={errors.residual} />
                </div>
              </div>
              <div className={`w-full lg:ml-2`}>
                <div className={`mb-4`}>
                  <InputLabel htmlFor={`duration`} value={`Duration`} />

                  <TextInput
                    id={`duration`}
                    type={`number`}
                    className={`mt-1 block w-full`}
                    value={data.duration}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => setData('duration', e.target.value)}
                    required
                  />

                  <InputError className={`mt-2`} message={errors.duration} />
                </div>
                <div className={`mb-4`}>
                  <InputLabel htmlFor={`interest`} value={`Interest`} />

                  <TextInput
                    id={`interest`}
                    type={`number`}
                    rightIcon={PiPercentBold}
                    className={`mt-1 block w-full`}
                    value={data.interest}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => setData('interest', e.target.value)}
                    required
                  />

                  <InputError message={errors.interest} className={`mt-2`} />
                </div>
                <div className={`mb-4`}>
                  <InputLabel htmlFor={`type`} value={`Type`} />

                  <TextInput
                    id={`type`}
                    type={`number`}
                    className={`mt-1 block w-full`}
                    value={data.type}
                    onKeyDown={blockInvalidChar}
                    onChange={(e) => setData('type', e.target.value)}
                    required
                  />

                  <InputError message={errors.type} className={`mt-2`} />
                </div>
              </div>
            </div>
            <div className={`md:flex`}>
              <div className={`w-full md:mr-2`}>

              </div>
              <div className={`w-full md:ml-2`}>
                {/* <div className={`mb-4`}>
                  <InputLabel htmlFor={`organization`} value={`Organization`} />

                  <SearchableDropdown
                    options={organizations}
                    onChange={(e) => setData('organization_id', e.id)}
                    defaultId={data.organization_id}
                  />

                  <InputError className={`mt-2`} message={errors.organozation_id} />
                </div>
                <div className={`mb-4`}>
                  <InputLabel htmlFor={`role`} value={`Role`} />

                  <SearchableDropdown
                    options={roles && roles}
                    onChange={(e) => setData('role', e.name)}
                    defaultId={data.role.id && data.role.id}
                  />

                  <InputError className={`mt-2`} message={errors.role} />
                </div> */}
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
            <p className={`text-sm text-gray-600`}>Created.</p>
          </Transition>
        </div>
      </section>
      <section>

      </section>
    </form >
  );
}