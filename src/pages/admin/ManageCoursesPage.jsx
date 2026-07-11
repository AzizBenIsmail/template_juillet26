import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function ManageCoursesPage() {
  const { courses, categories, deleteCourse } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Gestion des cours</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Modifier, créer ou supprimer un cours fictif.</p>
        </div>
        <Link to="/admin/courses/new">
          <Button>Créer un cours</Button>
        </Link>
      </div>
      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{course.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Catégorie : {categories.find((item) => item.id === course.category)?.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Prix : {course.price}€ · Niveau : {course.level}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to={`/admin/courses/${course.id}/edit`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">Éditer</Link>
                <Button type="button" className="bg-rose-500 hover:bg-rose-600" onClick={() => deleteCourse(course.id)}>Supprimer</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
