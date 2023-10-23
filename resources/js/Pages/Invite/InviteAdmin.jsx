import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InviteUser from '@/Components/InviteUser';

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Invite Admin</h2>}
    >
      <Head title="InviteAdmin" />
      <InviteUser />
    </AuthenticatedLayout>
  );
}
