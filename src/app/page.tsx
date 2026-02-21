'use client';
import { useForm } from 'react-hook-form';
import { Scale } from 'lucide-react';
import { format, addDays, isToday } from 'date-fns';
import { useEffect, useState } from 'react';

interface Log {
  date: string;
  weight: number;
}

export default function Dashboard() {
  const { register, handleSubmit, reset } = useForm<{ weight: number }>();
  const [logs, setLogs] = useState<Log[]>([]);
  const routine = [
    { day: 'Mon', time: 'AM', type: 'Push' },
    { day: 'Tue', time: 'Lunch', type: 'Pull' },
    { day: 'Wed', time: 'AM', type: 'Legs' },
    { day: 'Thu', time: 'Lunch', type: 'Pull' },
    { day: 'Fri', time: 'AM', type: 'Legs' },
    { day: 'Sat', time: 'Rest', type: 'Family' },
    { day: 'Sun', time: 'Rest', type: 'Prep' },
  ];
  const today = format(new Date(), 'eee');

  useEffect(() => {
    setLogs(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('weights') || '[]') : []);
  }, []);

  const onSubmit = (data: { weight: number }) => {
    const newLog: Log = { date: format(new Date(), 'yyyy-MM-dd'), weight: data.weight };
    const updated = [...logs, newLog].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setLogs(updated);
    if (typeof window !== 'undefined') localStorage.setItem('weights', JSON.stringify(updated));
    reset();
    alert('Weight logged!');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Scale /> Dashboard
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-2">
        <input
          type="number"
          placeholder="Weight (kg)"
          {...register('weight', { required: true, min: 0 })}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          step="0.1"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Log Weight
        </button>
      </form>
      <p className="mb-4">Current: {logs[logs.length - 1]?.weight || '106.6'}kg</p>
      <h3 className="text-xl mb-2">Weekly Routine</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Day</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {routine.map((item) => (
            <tr key={item.day}>
              <td className={today === item.day ? 'border p-2 bg-yellow-200' : 'border p-2'}>
                {item.day}
              </td>
              <td className="border p-2">{item.time}</td>
              <td className="border p-2">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}