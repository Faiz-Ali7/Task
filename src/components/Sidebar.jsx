import React, { memo } from 'react';
import { Layout, CheckSquare, Trophy, Settings, LogOut, Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navItems = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard' },
    { id: 'projects', icon: CheckSquare, label: 'Projects' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 text-2xl font-bold text-accent-primary font-display">
          <Terminal size={32} />
          <span>TrialUI</span>
        </div>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1">
        <ul className="list-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li 
                key={item.id} 
                className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer mb-2 transition-all duration-300 border
                  ${isActive 
                    ? 'text-text-primary bg-accent-primary/10 border-accent-primary/20' 
                    : 'text-text-secondary bg-transparent border-transparent hover:bg-white/5'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={20} />
                <span className={isActive ? 'font-semibold' : 'font-normal'}>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-border/50">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-text-secondary hover:bg-white/5 transition-all duration-300">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex m-3 h-[calc(100vh-24px)] flex-col p-6 glass-panel">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] z-[150] p-6 glass-panel border-r border-border rounded-none lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Sidebar);


