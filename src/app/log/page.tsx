'use client';
import { useForm } from 'react-hook-form';
import { Dumbbell } from 'lucide-react';

interface FormData {
  type: 'push' | 'pull' | 'legs';
  slot: 'AM' | 'Lunch';
  macros: string;
  notes: string;
}

export default function Log() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const logs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('workouts') || '[]') : [];
    if (typeof window !== 'undefined') localStorage.setItem('workouts', JSON.stringify([...logs, { ...data, date: new Date().toISOString() }]));
    alert('Workout logged!');
    reset();
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Dumbbell /> Log Workout
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <select {...register('type')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white">
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
        </select>
        <select {...register('slot')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white">
          <option value="AM">AM</option>
          <option value="Lunch">Lunch</option>
        </select>
        <input type="text" placeholder="Macros (e.g., 230p 200c 80f)" {...register('macros')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
        <textarea placeholder="Notes" {...register('notes')} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Log
        </button>
      </form>
      <p className="mt-4">Logs saved locally—view in console or add API later.</p>
    </div>
  );
}