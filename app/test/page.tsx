// components/CardSpill.tsx
'use client'; // for Next.js if using app directory

import { motion } from 'framer-motion';

const cards = [
  { title: 'DAO Create', desc: 'Launch your DAO in seconds' },
  { title: 'Govern', desc: 'On-chain governance made easy' },
  { title: 'Treasury', desc: 'Manage funds transparently' },
  { title: 'Proposals', desc: 'Vote on ideas in real time' },
];

export default function CardSpill() {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5, type: 'spring' }}
          className="min-w-[250px] bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 shadow-lg text-white"
        >
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-sm">{card.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
