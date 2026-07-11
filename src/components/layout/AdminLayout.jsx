import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Layers, Settings, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/courses', label: 'Cours', icon: BookOpen },
  { path: '/admin/users', label: 'Utilisateurs', icon: Users },
  { path: '/admin/categories', label: 'Catégories', icon: Layers },
  { path: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className={`z-20 min-h-screen border-r border-slate-200 bg-white px-4 py-6 transition dark:border-slate-800 dark:bg-slate-950 ${collapsed ? 'w-20' : 'w-64'}`}>
          <div className="flex items-center justify-between gap-4 px-3 pb-6">
            {!collapsed && <div className="text-xl font-semibold text-brand-700">LevelUp Admin</div>}
            <button className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200" onClick={() => setCollapsed((value) => !value)}>
              {collapsed ? '→' : '←'}
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-3xl px-3 py-3 text-sm font-medium transition ${active ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-100' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'}`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 bg-slate-50 dark:bg-slate-950">
          <header className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Back Office</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="text-sm text-slate-600 dark:text-slate-300">Bienvenue dans l'espace admin</div>
              </div>
            </div>
          </header>
          <main className="px-6 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
