import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateRolePermissionForm from './Partials/UpdateRolePermissionForm';
import UpdateRoleForm from './Partials/UpdateRoleForm';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';

export default function Edit({ auth, role, permissions, organization }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl ${textMain} leading-tight`}>Edit Role: {role.display_name}</h2>}
    >
      <Head title="All ToDos" />

      <div className={`py-12`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8`}>
          <UpdateRoleForm
            role={role}
            organization={organization}
          />
          <div className={` ${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex mt-8`}>
            <div className={`p-6 ${textMain} w-full`}>Permissions:</div>
          </div>
          <UpdateRolePermissionForm
            role={role}
            permissions={permissions}
          />
        </div>
      </div>

    </AuthenticatedLayout >
  );
}