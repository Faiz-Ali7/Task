import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import useStore from '../store/useStore';

const ProgressSection = () => {
  // Use selective selector to prevent unnecessary re-renders
  const user = useStore(state => state.user);

  if (!user) return null;

  return (
    <div className="p-6 mb-0 lg:mb-6 rounded-2xl border border-accent-primary/20 bg-linear-to-br from-accent-primary/10 to-accent-secondary/10 glass-panel shadow-glow">

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-accent-primary fill-accent-primary" />
          <h3 className="text-[1.1rem] font-bold font-display">Level {user.level} Experience</h3>
        </div>
        <span className="text-text-secondary text-[0.9rem] font-medium">{user.xp}% to Level {user.level + 1}</span>
      </div>

      <div className="h-3 bg-surface rounded-full overflow-hidden border border-border">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${user.xp}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-linear-to-r from-accent-primary to-accent-secondary shadow-[0_0_15px_var(--color-accent-primary)]"
        />
      </div>
      
      <p className="mt-3 text-text-secondary text-[0.85rem] leading-relaxed">
        Keep completing projects to reach the next milestone! You're in the top 5% this week.
      </p>
    </div>
  );
};

export default memo(ProgressSection);

