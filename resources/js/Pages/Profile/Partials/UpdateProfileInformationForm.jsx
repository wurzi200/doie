import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { textMain, textSecondary } from '@/constants';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', user, organizations }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        organization_id: user.organization_id
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={`${className}`}>
            <header>
                <h2 className={`${textMain} text-lg font-medium`}>Profile Information</h2>

                <p className={`${textSecondary} mt-1 text-sm`}>
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className={`mt-6 space-y-6`}>
                <div className={`flex flex-wrap md:flex-nowrap`}>
                    <div className={`w-full md:mr-4`}>
                        <div className={`mb-4`}>
                            <InputLabel htmlFor="name" value="Firstname" />

                            <TextInput
                                id="name"
                                className={`mt-1 block w-full`}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className={`mt-2`} message={errors.name} />
                        </div>

                        <div className={`mb-4`}>
                            <InputLabel htmlFor="lastname" value="Lastname" />

                            <TextInput
                                id="lastname"
                                className={`mt-1 block w-full`}
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                required
                                isFocused
                                autoComplete="lastname"
                            />

                            <InputError className={`mt-2`} message={errors.lastname} />
                        </div>
                        <div className={`mb-4`}>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                className={`mt-1 block w-full`}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />

                            <InputError className={`mt-2`} message={errors.email} />
                        </div>
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className={`text-sm mt-2 text-gray-800`}>
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className={`underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className={`mt-2 font-medium text-sm text-green-600`}>
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className={`flex items-center gap-4`}>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter={`transition ease-in-out`}
                        enterFrom={`opacity-0`}
                        leave={`transition ease-in-out`}
                        leaveTo={`opacity-0`}
                    >
                        <p className={`text-sm text-gray-600`}>Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}