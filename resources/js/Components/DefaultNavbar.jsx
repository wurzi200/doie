'use client';

import { Link } from '@inertiajs/react';
import { Dropdown, Navbar, Avatar } from 'flowbite-react';
import ApplicationLogo from './ApplicationLogo';
import NavLink from './NavLink';
import { useState } from 'react';
import ResponsiveNavLink from './ResponsiveNavLink';

export default function NavbarWithDropdown({ auth, user }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
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
        </div>
      </div>

      <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
        <div className="pt-4 pb-1 border-t border-gray-200">
          <div className="px-4">
            <div className="font-medium text-base text-gray-800">{user.name}</div>
            <div className="font-medium text-sm text-gray-500">{user.email}</div>
          </div>

          <div className="mt-3 space-y-1">
          </div>
        </div>
      </div>
    </nav>
  )
}


