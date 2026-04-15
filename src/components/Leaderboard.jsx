import React, { memo } from 'react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { Medal, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const { leaderboard, loading } = useStore();

  if (loading && leaderboard.length === 0) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 p-4 glass-panel">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={18} className="text-accent-secondary" />
        <h2 className="text-[1rem] font-bold font-display">Leaderboard</h2>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
        {leaderboard.map((user, index) => {
          const isTop = index === 0;
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-300
                ${isTop 
                  ? 'bg-[rgba(255,215,0,0.05)] border-[rgba(255,215,0,0.2)]' 
                  : 'bg-white/2 border-transparent'}`}
            >
              <div className={`w-5 h-5 flex items-center justify-center text-[0.75rem] font-bold
                ${isTop ? 'text-[#ffd700]' : 'text-text-secondary'}`}>
                {isTop ? <Medal size={14} /> : index + 1}
              </div>

              <img 
                src={user.avatar} 
                alt={user.name} 
                className={`w-7 h-7 rounded-full bg-surface border
                  ${isTop ? 'border-[#ffd700]' : 'border-border'}`}
              />

              <div className="flex-1">
                <p className="text-[0.8rem] font-semibold text-text-primary truncate">{user.name}</p>
                <p className="text-[0.65rem] text-text-secondary leading-tight">Exp: {user.score.toLocaleString()}</p>
              </div>

              {isTop && (
                <span className="text-[0.55rem] bg-[#ffd700] text-black px-1 py-0.5 rounded font-bold uppercase">
                  TOP
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2">
        <button className="w-full text-center py-1.5 px-3 rounded-lg bg-linear-to-br from-accent-primary to-accent-secondary text-white font-bold text-[0.8rem] transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-accent-primary/20">
          Full Rankings
        </button>
      </div>
    </div>
  );

};


export default memo(Leaderboard);
