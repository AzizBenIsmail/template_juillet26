import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <h1 className="text-3xl font-semibold">Connexion</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Entrez vos identifiants pour accéder à votre espace LevelUp.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
          <Button type="submit" className="w-full">Se connecter</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Pas encore de compte ? <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">Inscrivez-vous</Link>
        </p>
      </Card>
    </div>
  );
}
