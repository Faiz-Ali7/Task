import React, { memo } from 'react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { Code, Layers, Palette, Terminal, ChevronRight } from 'lucide-react';

const ProjectList = () => {
  const { projects, selectedProjectId, setSelectedProject, loading } = useStore();

  const getIcon = (category) => {
    switch (category) {
      case 'Frontend': return <Palette size={18} />;
      case 'Fullstack': return <Layers size={18} />;
      case 'UI/UX': return <Code size={18} />;
      default: return <Terminal size={18} />;
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-3 border-border border-t-accent-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg lg:text-xl font-bold font-display">Active Projects</h2>
        <span className="text-[0.75rem] lg:text-[0.85rem] text-text-secondary font-medium">{projects.length} Total</span>
      </div>

      <div className="flex flex-col gap-3 lg:gap-4 pr-0 lg:pr-2 custom-scrollbar">
        {projects.map((project, index) => {
          const isSelected = selectedProjectId === project.id;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedProject(project.id)}
              className={`group flex items-center gap-3 lg:gap-4 p-3.5 lg:p-4 cursor-pointer transition-all duration-300 glass-card
                ${isSelected 
                  ? 'border-l-4 border-l-accent-primary bg-accent-primary/5 shadow-inner' 
                  : 'border-l border-l-border bg-surface hover:bg-surface-hover hover:-translate-y-0.5 hover:shadow-2xl hover:border-accent-primary'}`}
            >
              <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center transition-colors shrink-0
                ${isSelected ? 'bg-accent-primary text-white' : 'bg-white/5 text-accent-primary group-hover:bg-accent-primary group-hover:text-white'}`}>
                {getIcon(project.category)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-[0.9rem] lg:text-[1rem] font-semibold mb-0.5 group-hover:text-accent-primary transition-colors truncate">{project.title}</h4>
                <p className="text-[0.75rem] lg:text-[0.85rem] text-text-secondary line-clamp-1">{project.description}</p>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2 text-right shrink-0">
                <span className="px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-[0.65rem] lg:text-[0.75rem] font-bold bg-success/10 text-success border border-success/20">
                  +{project.xp} XP
                </span>
                <ChevronRight size={14} lg:size={16} className="text-text-muted transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

};

export default memo(ProjectList);
