import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';

export default function AdminDashboardPage() {
  const { users, courses, categories } = useAuth();
  const activeUsers = useMemo(() => users.filter((user) => user.active).length, [users]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Utilisateurs actifs</p>
          <p className="mt-4 text-4xl font-semibold text-brand-700 dark:text-brand-300">{activeUsers}</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Cours disponibles</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{courses.length}</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Catégories</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{categories.length}</p>
        </Card>
      </div>
      <Card>
        <h2 className="text-2xl font-semibold">Résumé opérationnel</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Les chiffres ci-dessus sont simulés avec les données mock. Vous pouvez gérer les cours, utilisateurs et catégories sans backend.</p>
      </Card>
    </div>
  );
}
