import TextInput from './TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { backgroundSecondary, border, textMain, textSecondary } from '@/constants';

const InviteUser = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/invite', {
      onSuccess: () => {
        setData('email', '');
      },
    });
  };

  return (
    <div className={`py-12`}>
      <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8`}>
        <section className={`p-4 sm:p-8 ${backgroundSecondary} ${border} border shadow sm:rounded-lg`}>
          <header>
            <h2 className={`text-lg font-medium ${textMain}`}>Invite New Admin</h2>

            <p className={`mt-1 mb-4 text-sm ${textSecondary}`}>
            </p>
          </header>
          <form onSubmit={handleSubmit} className='p-4'>
            <div>
              <InputLabel htmlFor={`email`} value={`Email`} />

              <TextInput
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                required
              />

              <InputError errors={errors.email} />
            </div>
            <div className='mt-2'>
              <PrimaryButton type="submit" disabled={processing}>
                {processing ? 'Sending...' : 'Send Invite'}
              </PrimaryButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default InviteUser;