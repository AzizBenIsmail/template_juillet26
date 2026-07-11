import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { courses, categories, user, manageEnrollment } = useAuth();
  const course = useMemo(() => courses.find((item) => item.id === id), [courses, id]);

  if (!course) {
    return <div>Ce cours est introuvable.</div>;
  }

  const categoryName = categories.find((cat) => cat.id === course.category)?.name;
  const enrolled = user?.enrolledCourses?.includes(course.id);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-950">
          <Badge>{categoryName}</Badge>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{course.title}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{course.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{course.level}</span>
            <span>•</span>
            <span>{course.duration}</span>
            <span>•</span>
            <span>{course.students} inscrits</span>
          </div>
        </div>
        <Card>
          <h2 className="text-2xl font-semibold">Programme</h2>
          <ul className="mt-6 space-y-3">
            {course.program.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold">Avis des apprenants</h2>
          <div className="mt-6 space-y-4">
            {course.reviews.map((review) => (
              <div key={review.name} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-medium">{review.name}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{review.comment}</p>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Note : {review.rating}/5</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <aside className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Formateur</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">{course.instructor}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Prix</p>
              <p className="mt-2 text-3xl font-semibold text-brand-700 dark:text-brand-300">{course.price === 0 ? 'Gratuit' : `${course.price}€`}</p>
            </div>
            <Button onClick={() => manageEnrollment(course.id)}>{enrolled ? 'Se désinscrire' : 'S’inscrire au cours'}</Button>
          </div>
        </Card>
        <Card className="rounded-3xl bg-brand-50 dark:bg-slate-900">
          <h3 className="text-lg font-semibold">Pourquoi ce cours ?</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Accédez à des leçons structurées, des exercices pratiques et un suivi simple grâce à LevelUp.</p>
        </Card>
      </aside>
    </div>
  );
}
