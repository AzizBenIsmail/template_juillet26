import { useEffect, useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { getUsers } from '../../services/api.service.user';
import Card from '../../components/common/Card';

export default function ManageUsersPage() {
  const { t } = useLocale();
  const [backendUsers, setBackendUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await getUsers();
        const data = response.data;
        const list = Array.isArray(data) ? data : data.users || [];
        setBackendUsers(list);
      } catch (fetchError) {
        setError('Impossible de charger la liste des utilisateurs depuis le backend.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t('admin.manageUsers')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t('admin.manageUsersDescription')}</p>
      </div>
      {loading ? (
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-slate-700 dark:text-slate-300">Chargement des utilisateurs...</p>
        </div>
      ) : error ? (
        <div className="rounded-3xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-900/20 dark:text-rose-100">
          <p>{error}</p>
        </div>
      ) : backendUsers.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 p-6 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <p>Aucun utilisateur trouvé.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {backendUsers.map((user) => {
            const displayName = `${user.nom || ''} ${user.prenom || ''}`.trim() || user.email;

            return (
              <Card key={user._id || user.email}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{displayName}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('admin.userRole')}: {user.role}</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {user.age != null && <p>Âge : {user.age}</p>}
                    {user.sexe && <p>Sexe : {user.sexe}</p>}
                    {user.telephone && <p>Téléphone : {user.telephone}</p>}
                    {user.adresse && <p>Adresse : {user.adresse}</p>}
                    {user.experience && <p>Expérience : {user.experience}</p>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
