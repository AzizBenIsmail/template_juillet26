import { useLocale } from '../../context/LocaleContext';

export default function LocaleSelect() {
  const { locale, setLocale, languages } = useLocale();

  return (
    <select
      value={locale}
      onChange={(event) => setLocale(event.target.value)}
      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      {Object.entries(languages).map(([code, label]) => (
        <option key={code} value={code} className="bg-white dark:bg-slate-950">{label}</option>
      ))}
    </select>
  );
}
