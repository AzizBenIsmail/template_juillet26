import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(form);
    setMessage('Paramètres mis à jour.');
    setTimeout(() => setMessage(''), 2500);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <h1 className="text-3xl font-semibold">Paramètres</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Configurez votre profil administrateur.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <Input id="admin-name" label="Nom" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
          <Input id="admin-email" label="Email" type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
          <div className="flex justify-end">
            <Button type="submit">Enregistrer</Button>
          </div>
          {message && <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p>}
        </form>
      </Card>
    </div>
  );
}
