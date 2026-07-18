import { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Search } from 'lucide-react';

const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
const prices = ['Tous', 'Gratuit', '< 60€', '60€+'];

export default function CoursesPage() {
  const { courses, categories } = useAuth();
  const { t } = useLocale();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(t('courses.all'));
  const [level, setLevel] = useState(t('courses.all'));
  const [price, setPrice] = useState(t('courses.all'));

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch = [course.title, course.summary, course.instructor].some((value) => value.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === t('courses.all') || categories.find((cat) => cat.id === course.category)?.name === category;
      const matchLevel = level === t('courses.all') || course.level === level;
      const matchPrice =
        price === t('courses.all') ||
        (price === t('courses.free') && course.price === 0) ||
        (price === t('courses.below60') && course.price > 0 && course.price < 60) ||
        (price === t('courses.above60') && course.price >= 60);
      return matchSearch && matchCategory && matchLevel && matchPrice;
    });
  }, [courses, categories, search, category, level, price, t]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-950">
        <h1 className="text-3xl font-semibold">{t('courses.title')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t('courses.subtitle')}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('courses.searchPlaceholder')}
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <option>{t('courses.all')}</option>
              {categories.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <option>{t('courses.all')}</option>
              {levels.map((item) => (<option key={item}>{item}</option>))}
            </select>
            <select value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <option>{t('courses.all')}</option>
              <option>{t('courses.free')}</option>
              <option>{t('courses.below60')}</option>
              <option>{t('courses.above60')}</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-soft dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
            {t('courses.noResults')}
          </div>
        ) : (
          filtered.map((course) => {
            const categoryName = categories.find((item) => item.id === course.category)?.name;
            return (
              <Card key={course.id}>
                <div className="flex items-center justify-between gap-3">
                  <Badge>{categoryName}</Badge>
                  <Badge variant="neutral">{course.level}</Badge>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">{course.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{course.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>{course.duration}</span>
                  <span>{t('courses.students', { count: course.students })}</span>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{course.price === 0 ? t('courses.free') : `${course.price}€`}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{course.instructor}</p>
                  </div>
                  <Link to={`/courses/${course.id}`} className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">{t('courses.view')}</Link>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
