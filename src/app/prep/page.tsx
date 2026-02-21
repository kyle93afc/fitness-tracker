'use client';
import { useForm } from 'react-hook-form';
import { Package } from 'lucide-react';

interface FormData {
  meals: boolean;
  bag: boolean;
  notes: string;
}

export default function Prep() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const logs = JSON.parse(localStorage.getItem('preps') || '[]');
    localStorage.setItem('preps', JSON.stringify([...logs, { ...data, date: new Date().toISOString() }]));
    alert('Prep logged!');
    reset();
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Package /> Prep Checklist
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" {...register('meals')} />
          <span className="ml-2">Meals prepped (5x chicken/quinoa/veggies)</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" {...register('bag')} />
          <span className="ml-2">Bag packed (clothes, shaker, towel)</span>
        </label>
        <textarea placeholder="Notes (e.g., Poppy nap slot)" {...register('notes')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
          Log Prep
        </button>
      </form>
      <p className="mt-4">Sun 16:00 target—nudge incoming.</p>
    </div>
  );
}