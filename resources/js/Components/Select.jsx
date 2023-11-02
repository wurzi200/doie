import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { backgroundTertiary, border, textMain, textSecondary } from '../constants'

export default function Select({ options, selected, onChange, clearable }) {
  return (
    <div className={`top-16 w-full`}>
      <Listbox value={selected} onChange={onChange} className={`${border} border rounded-lg`}>
        <div className={`relative mt-1`}>
          <Listbox.Button className={`relative w-full cursor-default rounded-lg py-2.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${backgroundTertiary} ${textMain}`}>
            <span className={`block truncate `}>
              {selected?.name ? selected.name : (selected || 'Select...')}
            </span>

            <span className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ${textSecondary}`}>
              <ChevronUpDownIcon
                className={`h-5 w-5 ${textSecondary}`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={`z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${backgroundTertiary}`}>
              {options.map((option, optionId) => (
                <Listbox.Option
                  key={optionId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-500 text-white' : `${textMain}`
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${textSecondary}`}>
                          <CheckIcon className={`h-5 w-5`} aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}