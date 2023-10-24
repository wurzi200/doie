import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { backgroundSecondary, border, textMain, textSecondary, blockInvalidChar } from '@/Constants';
import Select from '@/Components/Select';

export default function CreateCalculationTypeForm({ organizations, user }) {

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    name: '',
    minCost: '',
    maxCost: '',
    minSpecial: '',
    maxSpecial: '',
    minResidual: '',
    maxResidual: '',
    minInterest: '',
    maxInterest: '',
    minDuration: '',
    maxDuration: '',
    type: 1,
  });

  const types = [
    { id: 1, name: 'Vorschüssig', unavailable: false },
    { id: 2, name: 'Nachschüssig', unavailable: false },
  ]

  const submit = (e) => {
    e.preventDefault();

    put(route('calculationType.store'));
  };

  return (
    <form onSubmit={submit} className={`mt-6 space-y-6`}>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>Calculation Type Name</h2>

          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            add a Name for your Calculation Type
          </p>
        </header>
        <div className={`mb-4`}>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            type="text"
            className={`mt-1 block w-full`}
            required
          />

          <InputError message={errors.name} className={`mt-2`} />
        </div>
      </section>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>Calculation Type Values</h2>

          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            add min or max values for your Calculation Type
          </p>
        </header>
        <div className={`flex flex-wrap md:flex-nowrap`}>
          <div className={`w-full md:mr-4`}>


            <div className={`mb-4`}>
              <InputLabel htmlFor="type" value="Type" />


              <Select
                id={`type`}
                options={types}
                type={`number`}
                className={`mt-1 block w-full`}
                onChange={(e) => setData('type', e.id)}
                selected={types.find(types => types.id === data.type)}
                required
              />

              <InputError className={`mt-2`} message={errors.type} />
            </div>

            <table className={`w-full`}>
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="md:mr-2">
                      <div className={`mb-4`}>
                        <InputLabel htmlFor="minCost" value="Min Cost" />

                        <TextInput
                          id="minCost"
                          value={data.minCost}
                          onChange={(e) => setData('minCost', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.minCost} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="minSpecial" value="Min Special" />

                        <TextInput
                          id="minSpecial"
                          value={data.minSpecial}
                          onChange={(e) => setData('minSpecial', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.minSpecial} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="minResidual" value="Min Residual" />

                        <TextInput
                          id="minResidual"
                          value={data.minResidual}
                          onChange={(e) => setData('minResidual', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.minResidual} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="minInterest" value="Min Interest" />

                        <TextInput
                          id="minInterest"
                          value={data.minInterest}
                          onChange={(e) => setData('minInterest', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.minInterest} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="minDuration" value="Min Duration" />

                        <TextInput
                          id="minDuration"
                          value={data.minDuration}
                          onChange={(e) => setData('minDuration', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.minDuration} className={`mt-2`} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="md:ml-2">
                      <div className={`mb-4`}>
                        <InputLabel htmlFor="maxCost" value="Max Cost" />

                        <TextInput
                          id="maxCost"
                          value={data.maxCost}
                          onChange={(e) => setData('maxCost', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.maxCost} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="maxSpecial" value="Max Special" />

                        <TextInput
                          id="maxSpecial"
                          value={data.maxSpecial}
                          onChange={(e) => setData('maxSpecial', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.maxSpecial} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="maxResidual" value="Max Residual" />

                        <TextInput
                          id="maxResidual"
                          value={data.maxResidual}
                          onChange={(e) => setData('maxResidual', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.maxResidual} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="maxInterest" value="Max Interest" />

                        <TextInput
                          id="maxInterest"
                          value={data.maxInterest}
                          onChange={(e) => setData('maxInterest', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.maxInterest} className={`mt-2`} />
                      </div>

                      <div className={`mb-4`}>
                        <InputLabel htmlFor="maxDuration" value="Max Duration" />

                        <TextInput
                          id="maxDuration"
                          value={data.maxDuration}
                          onChange={(e) => setData('maxDuration', e.target.value)}
                          type="number"
                          className={`mt-1 block w-full`}
                          required
                          onKeyDown={blockInvalidChar}
                        />

                        <InputError message={errors.maxDuration} className={`mt-2`} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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