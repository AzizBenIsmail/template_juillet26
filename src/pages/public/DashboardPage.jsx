import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user, courses } = useAuth();
  const enrolled = (user?.enrolledCourses || []).map((courseId) => courses.find((c) => c.id === courseId)).filter(Boolean);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-950">
        <h1 className="text-3xl font-semibold">Bienvenue, {user?.name}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Votre espace apprenant contient votre progression, vos cours et vos certificats.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Cours inscrits</p>
          <p className="mt-4 text-4xl font-semibold text-brand-700 dark:text-brand-300">{enrolled.length}</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Progrès global</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{enrolled.reduce((sum, course) => sum + (user.progress?.[course.id] || 0), 0) / Math.max(enrolled.length, 1)}%</p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Certificats</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{enrolled.filter((course) => user.progress?.[course.id] === 100).length}</p>
        </Card>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Mes cours</h2>
          <Link to="/courses" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">Parcourir les cours</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {enrolled.length === 0 ? (
            <Card className="text-center text-slate-600 dark:text-slate-400">Vous n’êtes inscrit à aucun cours pour l’instant.</Card>
          ) : (
            enrolled.map((course) => (
              <Card key={course.id}>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Progrès : {user.progress?.[course.id] || 0}%</p>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
