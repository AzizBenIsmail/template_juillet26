export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition dark:border-slate-700 dark:bg-slate-950 ${className}`}>
      {children}
    </div>
  );
}
