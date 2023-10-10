'use client';

import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Sidenav from '@/Components/Sidenav';
import DefaultNavbar from '@/Components/DefaultNavbar';

export default function UserLayout({ auth, user, header, children }) {

  return (
    <div className="min-h-screen bg-gray-100">
      <nav>
        <DefaultNavbar auth={auth} user={user} />
      </nav>
      <div className="flex">
        <div>
          <aside>
            <Sidenav />
          </aside>
        </div>
        <div className="w-full">
          {header && (
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>
          )}

          <main>{children}</main>
        </div>
      </div>
    </div >
  );
}
