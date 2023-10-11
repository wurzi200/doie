'use client';

import Sidenav from '@/Components/Sidenav';
import DefaultNavbar from '@/Components/DefaultNavbar';
import { backgroundMain, backgroundSecondary, border, textMain } from '../constants';


export default function Authenticated({ auth, user, header, children }) {

    return (
        <div className={`${backgroundMain} min-h-screen`}>
            <nav className="fixed w-full z-50">
                <DefaultNavbar auth={auth} user={user} />
            </nav>
            <div className="flex">
                <div>
                    <aside className="fixed left-0 top-0 z-30 pt-16 h-full">
                        <Sidenav />
                    </aside>
                </div>
                <div className="w-full ml-64 overflow-y-auto relative pt-16">
                    {header && (
                        <header className={`${backgroundSecondary + border} border-b shadow`}>
                            <div className={`${backgroundSecondary + textMain} mx-auto py-6 px-4 sm:px-6 lg:px-8`}>{header}</div>
                        </header>
                    )}
                    <main>{children}</main>
                </div>
            </div>
        </div >
    );
}
