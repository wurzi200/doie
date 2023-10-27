import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { backgroundSecondary, border, textMain, textSecondary } from '@/Constants';
import ImageUpload from '@/Components/ImageUpload';
import { useState } from 'react';

export default function LogoUploadForm({ organization, logoUrl }) {

  const { data, setData, post, errors, processing, progress, recentlySuccessful } = useForm({
    logo: organization.logo,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('organization.uploadLogo', organization.id));
  };

  return (
    <form onSubmit={submit} className={`mt-6 space-y-6`}>
      <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
        <header>
          <h2 className={`text-lg font-medium ${textMain}`}>Logo</h2>

          <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            Upload a Organization Logo
          </p>
        </header>
        <div className={``}>
          <ImageUpload
            setImageData={(e) => setData('logo', e)}
            image={logoUrl}
            progress={progress}
          />
          <InputError className={`mt-2`} message={errors.logo} />
        </div >
        <div className={`flex items-center gap-4 mt-4`}>
          {data.logo.url != logoUrl &&
            <PrimaryButton disabled={progress}>Save</PrimaryButton>
          }
          <Transition
            show={recentlySuccessful}
            enter={`transition ease-in-out`}
            enterFrom={`opacity-0`}
            leave={`transition ease-in-out`}
            leaveTo={`opacity-0`}
          >
            <p className={`text-sm ${textSecondary}`}>Uploaded</p>
          </Transition>
        </div>
      </section >
    </form >
  );
}