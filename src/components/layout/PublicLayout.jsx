import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';
import LocaleSelect from './LocaleSelect';

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold text-brand-700 dark:text-brand-300">LevelUp</Link>
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <LocaleSelect />
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:bg-slate-900 dark:text-slate-200"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
              {t('nav.menu', { defaultValue: 'Menu' })}
            </button>
          </div>
          <div className="flex items-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <LocaleSelect />
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:bg-slate-900 dark:text-slate-200"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
              {t('nav.menu', { defaultValue: 'Menu' })}
            </button>
          </div>
          <nav className={`absolute inset-x-0 top-full bg-white/95 pb-6 shadow-lg transition-all duration-300 dark:bg-slate-950/95 ${open ? 'visible opacity-100' : 'invisible opacity-0'} sm:static sm:shadow-none sm:bg-transparent sm:pb-0 sm:opacity-100 sm:visible`}>
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 pt-4 sm:flex-row sm:items-center sm:gap-6 sm:pt-0">
              <Link to="/courses" className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200">{t('nav.courses')}</Link>
              <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200">{t('nav.dashboard')}</Link>
              <Link to="/admin" className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200">{t('nav.admin')}</Link>
              <div className="mt-3 flex gap-3 sm:mt-0">
                <Link to="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200">{t('nav.login')}</Link>
                <Link to="/register" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">{t('nav.register')}</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        {t('footer.copy')}
      </footer>
    </div>
  );
}
