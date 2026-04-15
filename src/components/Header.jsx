import React, { memo } from 'react';
import useStore from '../store/useStore';
import { Bell, Search, Star, Command, ChevronDown, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  // Use selective selector to only re-render if user object changes
  const user = useStore(state => state.user);

  if (!user) return <header className="h-[var(--header-height)]"></header>;

  return (
    <header className="h-[var(--header-height)] flex items-center justify-between px-4 lg:px-8 border-b border-border bg-glass backdrop-blur-3xl sticky top-0 z-[100] shadow-glow">
      <div className="flex items-center gap-3 lg:gap-8">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-text-primary hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg lg:text-xl font-bold font-display text-text-primary whitespace-nowrap">
          <span className="hidden sm:inline">Hello, </span>{user.name.split(' ')[0]}
        </h1>

        <div className="hidden md:flex items-center bg-white/5 px-4.5 py-2.5 rounded-xl w-[280px] lg:w-[360px] gap-3 border border-border transition-all duration-300 focus-within:border-accent-primary group">
          <Search size={18} className="text-text-secondary group-focus-within:text-accent-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none text-text-primary outline-none text-[0.9rem] w-full font-normal"
          />
          <div className="hidden lg:flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border text-text-muted text-[0.7rem]">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-8">
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 text-text-primary font-semibold text-[0.9rem] lg:text-[0.95rem]">
            <Star size={18} fill="var(--color-accent-secondary)" className="text-accent-secondary" />
            <span>{user.points?.toLocaleString()} <span className="hidden lg:inline text-text-secondary font-normal text-[0.85rem]">Points</span></span>
          </div>
        </div>

        <div className="hidden sm:block w-[1px] h-6 bg-border"></div>

        <div className="flex items-center gap-3 lg:gap-5">
          <button className="bg-transparent border-none text-text-secondary cursor-pointer relative flex items-center justify-center hover:text-text-primary transition-colors">
            <Bell size={20} lg:size={22} />
            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-accent-primary rounded-full border-2 border-bg shadow-[0_0_10px_var(--color-accent-primary)]"></span>
          </button>

          <div className="flex items-center gap-3 cursor-pointer p-1 lg:pr-2 rounded-xl transition-all duration-300 hover:bg-white/5">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-9 h-9 lg:w-10.5 lg:h-10.5 rounded-xl border-2 border-accent-primary p-0.5 bg-surface"
            />
            <div className="hidden xs:flex flex-col">
              <span className="text-[0.85rem] lg:text-[0.9rem] font-bold text-text-primary truncate max-w-[80px] lg:max-w-[100px]">{user.name.split(' ')[0]}</span>
              <span className="text-[0.7rem] lg:text-[0.75rem] text-accent-secondary font-semibold uppercase tracking-wider">Lvl {user.level}</span>
            </div>
            <ChevronDown size={14} lg:size={16} className="text-text-muted" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);


