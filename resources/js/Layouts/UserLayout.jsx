'use client';

import Sidenav from '@/Components/Sidenav';
import DefaultNavbar from '@/Components/DefaultNavbar';
import { backgroundMain, backgroundSecondary, border, textMain } from '../constants';


export default function UserLayout({ auth, user, header, children }) {

  return (
    <div className={`${backgroundMain} min-h-screen`}>
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
            <header className={`${backgroundSecondary + border} border-b shadow`}>
              <div className={backgroundSecondary + `max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-white`}>{header}</div>
            </header>
          )}
          <main>{children}</main>
        </div>
      </div>
    </div >
  );
}
