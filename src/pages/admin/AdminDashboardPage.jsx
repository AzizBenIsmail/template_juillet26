import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';
import Card from '../../components/common/Card';

export default function AdminDashboardPage() {
  const { users, courses, categories } = useAuth();
  const { t } = useLocale();
  const activeUsers = useMemo(() => users.filter((user) => user.active).length, [users]);
  const totalUsers = users.length;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.activeUsers')}</p>
          <p className="mt-4 text-4xl font-semibold text-brand-700 dark:text-brand-300">{activeUsers}</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.availableCourses')}</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{courses.length}</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.categoriesCount')}</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{categories.length}</p>
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('admin.usersList')}</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{totalUsers}</p>
            </div>
            <Link
              to="/admin/users"
              className="inline-flex w-fit items-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
            >
              {t('admin.viewUsers')}
            </Link>
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-2xl font-semibold">{t('admin.dashboardTitle')}</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">{t('admin.overview')}</p>
      </Card>
    </div>
  );
}
