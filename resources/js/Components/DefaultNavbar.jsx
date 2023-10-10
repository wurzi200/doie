'use client';

import { useState } from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

import { backgroundMain, backgroundSecondary, border, textMain, textSecondary } from '../constants';


export default function NavbarWithDropdown({ auth, user }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <nav className={`${backgroundSecondary + border} border-b`}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <ApplicationLogo className={`${textMain} block h-9 w-auto fill-current`} />
              </Link>
            </div>

            {/* <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
              </NavLink>
              {auth.permissions.find((permission => permission.name === 'show_users')) &&

                <NavLink href={route('users.index')} active={route().current('users.*')}>
                  Users
                </NavLink>
              }
              {auth.permissions.find((permission => permission.name === 'show_organizations')) &&
                <NavLink href={route('organizations.index')} active={route().current('organizations.*')}>
                  Organization
                </NavLink>
              }
              {auth.permissions.find((permission => permission.name === 'show_roles')) &&
                <NavLink href={route('roles.index')} active={route().current('roles.*')}>
                  Roles
                </NavLink>
              }
              {user.roles.find((role => role.name === 'super-admin-1')) &&
                <NavLink href={route('permissions.index')} active={route().current('permissions.*')}>
                  Permissions
                </NavLink>
              }
            </div> */}
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <DarkThemeToggle />
            <div className="ml-3 relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      {user.name}
                      <svg
                        className="ml-2 -mr-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                  <Dropdown.Link href={route('logout')} method="post" as="button">
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav >
  )
}


