import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function ManageUsersPage() {
  const { users, toggleUserActive, changeUserRole } = useAuth();
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t('admin.manageUsers')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t('admin.manageUsersDescription')}</p>
      </div>
      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('admin.userRole')}: {user.role}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" className="bg-slate-700 hover:bg-slate-800" onClick={() => changeUserRole(user.id, user.role === 'admin' ? 'learner' : 'admin')}>
                  {user.role === 'admin' ? t('admin.learnerRole') : t('admin.adminRole')}
                </Button>
                <Button type="button" className={user.active ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'} onClick={() => toggleUserActive(user.id)}>
                  {user.active ? t('admin.deactivate') : t('admin.activate')}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
