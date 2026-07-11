import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function ManageUsersPage() {
  const { users, toggleUserActive, changeUserRole } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Gestion des utilisateurs</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Activez, désactivez ou changez de rôle pour les comptes fictifs.</p>
      </div>
      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Rôle : {user.role}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" className="bg-slate-700 hover:bg-slate-800" onClick={() => changeUserRole(user.id, user.role === 'admin' ? 'learner' : 'admin')}>
                  {user.role === 'admin' ? 'Passer apprenant' : 'Passer admin'}
                </Button>
                <Button type="button" className={user.active ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'} onClick={() => toggleUserActive(user.id)}>
                  {user.active ? 'Désactiver' : 'Activer'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
