'use client'; // only for Next.js app dir

import { motion } from 'framer-motion';

export default function Tagline() {
  return (
    <>
      <motion.h1
       className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        Dao Connect - Build the Future of Decentralized Governance
      </motion.h1>
      <motion.p
        className="mx-auto max-w-[700px] text-white md:text-xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        Create, manage, and participate in decentralized autonomous organizations with AI-powered governance on
        the Polkadot ecosystem.
      </motion.p>
    </>
  );
}


    


