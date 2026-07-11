import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

export default function CourseFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, categories, addCourse, updateCourse } = useAuth();
  const editing = Boolean(id);
  const course = useMemo(() => courses.find((item) => item.id === id), [courses, id]);

  const [form, setForm] = useState({
    title: '',
    summary: '',
    category: categories[0]?.id || '',
    level: 'Débutant',
    price: 0,
    duration: '',
    instructor: '',
  });

  useEffect(() => {
    if (editing && course) {
      setForm({
        title: course.title,
        summary: course.summary,
        category: course.category,
        level: course.level,
        price: course.price,
        duration: course.duration,
        instructor: course.instructor,
      });
    }
  }, [editing, course]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      updateCourse(id, form);
    } else {
      addCourse(form);
    }
    navigate('/admin/courses');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <h1 className="text-3xl font-semibold">{editing ? 'Modifier le cours' : 'Créer un nouveau cours'}</h1>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <Input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} label="Titre" />
          <Input value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} label="Résumé" />
          <div className="grid gap-4 md:grid-cols-2">
            <select value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              {categories.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
            </select>
            <select value={form.level} onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))} label="Prix (€)" type="number" />
            <Input value={form.duration} onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))} label="Durée" />
          </div>
          <Input value={form.instructor} onChange={(e) => setForm((prev) => ({ ...prev, instructor: e.target.value }))} label="Formateur" />
          <div className="flex justify-end">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
