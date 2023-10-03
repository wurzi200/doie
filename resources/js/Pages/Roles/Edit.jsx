import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateRolePermissionForm from './UpdateRolePermissionForm';

export default function Edit({ auth, role, permissions }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={< h2 className="font-semibold text-xl text-gray-800 leading-tight" >Edit Role: {role.name}</h2 >}
    >
      <Head title="All ToDos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
            <div className="p-6 text-gray-900 w-full">Permissions:</div>
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
