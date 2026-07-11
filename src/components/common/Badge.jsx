export default function Badge({ children, variant = 'brand', className = '' }) {
  const variants = {
    brand: 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-100',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100',
  };
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variants[variant] || variants.brand} ${className}`}>
      {children}
    </span>
  );
}
