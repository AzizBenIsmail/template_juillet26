import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Tous les champs sont requis.');
      return;
    }
    const result = register(form);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <h1 className="text-3xl font-semibold">Inscription</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Créez un compte gratuit pour rejoindre LevelUp.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            id="name"
            label="Nom complet"
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Input
            id="password"
            label="Mot de passe"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">Créer mon compte</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Déjà inscrit ? <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Connectez-vous</Link>
        </p>
      </Card>
    </div>
  );
}
