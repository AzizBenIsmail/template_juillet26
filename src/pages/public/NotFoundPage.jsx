import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page introuvable</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">La page que vous recherchez n’existe pas ou a été déplacée.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}
