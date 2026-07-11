import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const benefits = [
  { title: 'Cours modernes', description: 'Contenus pratiques mis à jour pour les métiers digitaux.', icon: BookOpen },
  { title: 'Progrès suivis', description: 'Suivez votre avance et obtenez des certificats motivants.', icon: ShieldCheck },
  { title: 'Communauté active', description: 'Rejoignez une communauté d’apprenants et d’experts.', icon: Star },
];

export default function LandingPage() {
  const { courses } = useAuth();
  return (
    <div className="space-y-16">
      <section className="rounded-[2rem] bg-hero-gradient px-6 py-16 text-white shadow-soft sm:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-200/90">Boostez vos compétences</p>
              <h1 className="text-4xl font-semibold sm:text-5xl">LevelUp, la plateforme e-learning pour aller plus loin.</h1>
              <p className="mt-6 max-w-2xl text-base text-slate-100/90">Découvrez des parcours interactifs, suivez votre progression et obtenez des certificats digitaux — sans backend complexe.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/courses" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-slate-100">
                  Voir les cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center rounded-full border border-white/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Commencer maintenant
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="bg-white/10 text-white shadow-none ring-1 ring-white/10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-slate-100/85">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-5 rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-950">
          <h2 className="text-2xl font-semibold">Catégories populaires</h2>
          <div className="grid gap-3">
            <Badge>Design</Badge>
            <Badge>Développement</Badge>
            <Badge>Marketing</Badge>
            <Badge>Productivité</Badge>
          </div>
        </div>
        <div className="space-y-5 rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-950">
          <h2 className="text-2xl font-semibold">Témoignages</h2>
          <div className="space-y-4">
            <Card className="bg-slate-50 dark:bg-slate-900">
              <p className="text-sm text-slate-700 dark:text-slate-300">« LevelUp m'a aidé à progresser rapidement en React et à obtenir des missions freelance. »</p>
              <p className="mt-4 font-semibold">Lucie, développeuse front-end</p>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900">
              <p className="text-sm text-slate-700 dark:text-slate-300">« Formation claire et visuelle, je recommande pour lancer son projet digital. »</p>
              <p className="mt-4 font-semibold">Camille, créatrice de contenu</p>
            </Card>
          </div>
        </div>
        <div className="space-y-5 rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-950">
          <h2 className="text-2xl font-semibold">Cours récents</h2>
          <div className="space-y-4">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{course.instructor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
