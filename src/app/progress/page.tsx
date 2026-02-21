'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
import { useEffect, useState } from 'react';

interface Log {
  date: string;
  weight: number;
}

export default function Progress() {
  const [logs, setLogs] = useState<Log[]>([]);
  const goalDate = new Date('2026-08-31').toISOString().split('T')[0];
  const goalWeight = 90;
  const milestones = [
    { date: '2026-02-28', weight: 105, name: 'End Feb' },
    { date: '2026-04-30', weight: 100, name: 'End Apr' },
    { date: '2026-06-04', weight: 96, name: 'Harris Bday' },
    { date: '2026-08-31', weight: 90, name: 'Goal' },
  ];

  useEffect(() => {
    setLogs(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('weights') || '[]') : []);
  }, []);

  const data = logs.map(log => ({
    date: new Date(log.date).toLocaleDateString(),
    weight: log.weight,
  })).concat(milestones.map(m => ({
    date: new Date(m.date).toLocaleDateString(),
    weight: m.weight,
  }))).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Progress to 90kg</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight" />
          <Scatter dataKey="weight" fill="#ff7300" name="Milestones" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}