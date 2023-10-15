import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import PermissionList from "./PermissionList";
import Pagination from "@/Components/Pagination";
import { backgroundSecondary, textMain, textSecondary } from '@/Constants';

export default function UsersListView({ auth, permissions }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Permission</h2>}
    >
      <Head title="Permission" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8`}>
          <div className={`flex ${backgroundSecondary} overflow-hidden shadow-sm sm:rounded-lg`}>
            <div className={`p-6 ${textSecondary} w-full`}>Permission</div>
          </div>
          {
            permissions &&
            <>
              <Pagination className={`mt-6`} links={permissions.links} />
              <PermissionList permissions={permissions}></PermissionList>
              <Pagination className={`mt-6`} links={permissions.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}