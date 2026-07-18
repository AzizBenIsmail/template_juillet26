import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { t } = useLocale();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <h1 className="text-3xl font-semibold">{t('profile.title')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t('profile.description')}</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input id="name" label={t('auth.name')} value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
          <Input id="email" label={t('auth.email')} type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
          <Button type="submit" className="w-full">{t('buttons.save')}</Button>
          {saved && <p className="text-sm text-emerald-600 dark:text-emerald-400">{t('profile.updated')}</p>}
        </form>
      </Card>
    </div>
  );
}
