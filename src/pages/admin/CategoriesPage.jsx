import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function CategoriesPage() {
  const { categories, addCategory, removeCategory } = useAuth();
  const [name, setName] = useState('');

  const handleAdd = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    addCategory(name.trim());
    setName('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Gestion des catégories</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Ajoutez ou supprimez des catégories pour votre catalogue.</p>
      </div>
      <Card>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <Input id="category-name" label="Nouvelle catégorie" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" className="self-end">Ajouter</Button>
        </form>
      </Card>
      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{category.name}</h2>
            </div>
            <Button type="button" className="bg-rose-500 hover:bg-rose-600" onClick={() => removeCategory(category.id)}>
              Supprimer
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
