import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { backgroundSecondary, textMain } from '@/constants';

export default function Edit({ auth, mustVerifyEmail, status, user, organizations, roles }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className={`${textMain} font-semibold text-xl leading-tight`}>Profile</h2>}
        >
            <Head title="Profile" />

            <div className={`py-12`}>
                <div className={`mx-auto sm:px-6 lg:px-8 space-y-6`}>
                    <div className={`${backgroundSecondary} p-4 sm:p-8 shadow sm:rounded-lg`}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className={`w-full`}
                            user={user}
                            organizations={organizations}
                            roles={roles}
                        />
                    </div>

                    <div className={`${backgroundSecondary} p-4 sm:p-8 shadow sm:rounded-lg`}>
                        <UpdatePasswordForm className={`max-w-xl`} />
                    </div>

                    <div className={`${backgroundSecondary} p-4 sm:p-8 shadow sm:rounded-lg`}>
                        <DeleteUserForm className={`max-w-xl`} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}