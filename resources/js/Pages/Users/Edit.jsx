import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateUserInformationForm from './Partials/UpdateUserInformationForm';
import { Head } from '@inertiajs/react';
import { backgroundMain, backgroundSecondary, border, textMain } from '@/Constants';

export default function Edit({ auth, mustVerifyEmail, status, user, organizations, roles }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className={`${textMain} font-semibold text-xl leading-tight`}>Edit User: {user.name}</h2>}
        >
            <Head title="Edit User" />

            <div className={`py-12 ${backgroundMain}`}>
                <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 ${textMain}`}>
                    <div className={`${backgroundSecondary} ${border} border p-4 sm:p-8 shadow sm:rounded-lg`}>
                        <UpdateUserInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className={`w-full`}
                            user={user}
                            organizations={organizations}
                            roles={roles}
                        />
                    </div>

                    <div className={`${backgroundSecondary} ${border} border p-4 sm:p-8 shadow sm:rounded-lg`}>
                        <UpdatePasswordForm user={user} className={`max-w-xl`} />
                    </div>

                    <div className={`${backgroundSecondary} ${border} border p-4 sm:p-8 shadow sm:rounded-lg`}>
                        <DeleteUserForm user={user} className={`max-w-xl`} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}