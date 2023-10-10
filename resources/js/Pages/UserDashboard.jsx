import { Head } from '@inertiajs/react';
import UserLayout from '../Layouts/UserLayout';
import { backgroundSecondary, border, textMain } from '../constants';

export default function Dashboard({ auth }) {
  return (
    <UserLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">User Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className={`${backgroundSecondary + border} border overflow-hidden shadow-sm sm:rounded-lg`}>
            <div className="p-6 text-gray-900 dark:text-white">You're logged in!</div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
