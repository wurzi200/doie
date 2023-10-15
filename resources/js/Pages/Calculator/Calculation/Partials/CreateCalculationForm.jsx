import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SearchableDropdown from '@/Components/SearchableDropdown';
import { TextInput } from 'flowbite-react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { backgroundSecondary, blockInvalidChar, border, textMain, textSecondary } from '@/constants';
import { PiCurrencyEurBold, PiPercentBold } from 'react-icons/pi';
import { useState } from 'react';

export default function CreateCalculationForm({ organizations, roles, user, calculationTypes }) {
  const [rate, setRate] = useState(0);
  const [InputErrors, setInputErrors] = useState({});
  const { data, setData, put, errors, setError, clearErrors, processing, recentlySuccessful } = useForm({
    calculationType: calculationTypes[0] ? calculationTypes[0].id : '',
    cost: '123',
    special: '10',
    residual: '10',
    duration: '10',
    interest: '1',
    rate: '',
  });
  const submit = (e) => {
    e.preventDefault();

    put(route('calculation.store'));
  };

  const calculate = (e) => {
    e.preventDefault();

    axios.post(route('calculate'), data)
      .then(function (response) {
        setRate(response.data);
        setData('rate', response.data)
        clearErrors();
      })
      .catch(function (error) {
        clearErrors();
        setError(error.response.data.errors);
      });
  }

  return (
    calculationTypes[0] ?
      <form onSubmit={submit} className={`space-y-6`}>
        <section className={`${backgroundSecondary} ${border} border p-4 sm:p-6 shadow sm:rounded-lg`}>
          <header>
            <h2 className={`${textMain} text-lg font-medium`}>Calculation</h2>

            <p className={`${textSecondary} mt-1 mb-4 text-sm`}>
              Calculation details
            </p>
          </header>
          <div className={`flex flex-wrap md:flex-nowrap`}>
            <div className={`w-full`}>
              <div className={`mb-4`}>
                <InputLabel htmlFor={`calculationType`} value={`Calculation Type`} />

                <SearchableDropdown
                  id={`calculationType`}
                  options={calculationTypes}
                  className={`mt-1 block w-full`}
                  onChange={(e) => setData('calculationType', e.id)}
                  defaultId={data.calculationType}
                  required
                />

                <InputError message={errors.calculationType} className={`mt-2`} />
              </div>
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
                </div>
              </div>
            </div>
          </div>
          <div>
            <InputLabel htmlFor={`rate`} value={`Rate`} />
            <TextInput
              className='text-center'
              value={rate}
              disabled
            />
          </div>
          <div className={`flex items-center gap-4 mt-4`}>
            <PrimaryButton onClick={calculate} disabled={processing}>Calculate</PrimaryButton>
            <PrimaryButton type="submit" disabled={processing}>Create</PrimaryButton>


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
      </form > :
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-2xl mr-2">No Calculation Types found.</p>
        <a href={route('calculationType.create')} className="text-blue-500 text-2xl hover:underline">Click Here to Create One</a>
      </div>
  );
}