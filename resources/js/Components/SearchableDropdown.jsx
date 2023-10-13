import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from '@/Constants';

export default function SearchableDropdown({ options, defaultId, onChange }) {

  const [query, setQuery] = useState('')
  const filteredoptions =
    query === ''
      ? options
      : options.filter((option) =>
        option.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div className={`w-full`}>
      <Combobox onChange={onChange} value={options.find(option => option.id === defaultId)}>
        <div className={`relative mt-1`}>
          <div className={`relative w-full cursor-default overflow-hidden rounded-md ${backgroundSecondary} text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}>
            <Combobox.Input
              className={`${textSecondary} ${backgroundTertiary} ${border} border  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block w-full`}
              displayValue={(option) => option.display_name ? option.display_name : option.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className={`absolute inset-y-0 right-0 flex items-center pr-2`}>
              <ChevronUpDownIcon
                className={`h-5 w-5 ${textSecondary}`}
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave={`transition ease-in duration-100`}
            leaveFrom={`opacity-100`}
            leaveTo={`opacity-0`}
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className={`z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md ${backgroundTertiary} border-b py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
              {filteredoptions.length === 0 && query !== '' ? (
                <div className={`relative cursor-default select-none py-2 px-4 ${textSecondary}`}>
                  Nothing found.
                </div>
              ) : (
                filteredoptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${border} border-b ${active ? 'bg-indigo-500 text-white' : `${textSecondary}`
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {option.display_name ? option.display_name : option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                              }`}
                          >
                            <CheckIcon className={`h-5 w-5`} aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div >
  )
}