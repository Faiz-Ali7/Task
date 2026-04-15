import React, { useEffect, useState, lazy, Suspense } from 'react';
import useStore from './store/useStore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProgressSection from './components/ProgressSection';
import ProjectList from './components/ProjectList';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load components for performance
const Leaderboard = lazy(() => import('./components/Leaderboard'));
const EditorPanel = lazy(() => import('./components/EditorPanel'));

// Loading Fallback Component
const ComponentLoader = () => (
  <div className="flex-1 flex items-center justify-center p-12">
    <div className="w-10 h-10 border-3 border-border border-t-accent-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  // Use selective selectors to prevent unnecessary re-renders
  const fetchData = useStore(state => state.fetchData);
  const error = useStore(state => state.error);
  const clearError = () => useStore.setState({ error: null });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('projects');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mobileTabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[var(--sidebar-width)_1fr] h-screen w-screen overflow-hidden bg-bg text-text-primary relative">
      {/* Sidebar - Handles both mobile drawer and desktop side menu */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false); // Close mobile sidebar on select
        }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] lg:hidden"
          />
        )}
      </AnimatePresence>
      
      <div className="flex flex-col h-screen overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Mobile Global Stats & Navigation */}
        <div className="lg:hidden flex flex-col gap-4 p-4 bg-bg border-b border-border shadow-sm sticky top-[var(--header-height)] z-[100] bg-glass/80 backdrop-blur-xl">
          <ProgressSection />
          
          <div className="p-1.5 bg-surface/50 rounded-full border border-border flex items-center justify-between">
            {mobileTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMobileTab(tab.id)}
                className={`relative flex-1 px-4 py-2.5 rounded-full text-[0.85rem] font-bold transition-all duration-300
                  ${activeMobileTab === tab.id 
                    ? 'text-white shadow-lg' 
                    : 'text-text-secondary hover:text-text-primary'}`}
              >
                {activeMobileTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-linear-to-br from-accent-primary to-accent-secondary rounded-full -z-1"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-[1fr_390px] p-4 lg:p-7 gap-5 lg:gap-8 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden scroll-smooth custom-scrollbar">
          {/* Main Content Column */}
          <div className={`flex flex-col gap-6 h-auto lg:h-full overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar 
            ${activeMobileTab !== 'projects' ? 'hidden lg:flex' : 'flex'}`}>
            {activeTab === 'dashboard' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6 h-full"
              >
                {/* ProgressSection visible in left column on desktop only */}
                <div className="hidden lg:block">
                  <ProgressSection />
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <ProjectList />
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full text-text-secondary min-h-[400px]">
                <h2 className="text-xl font-display">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} coming soon...</h2>
              </div>
            )}
          </div>


          {/* Right Sidebar Column - Stacks on mobile, fixed on desktop */}
          <div className={`flex flex-col gap-6 h-auto lg:h-full lg:overflow-y-auto pr-0 lg:pr-1 custom-scrollbar pb-8 lg:pb-0 
            ${(activeMobileTab === 'projects') ? 'hidden lg:flex' : 'flex'}`}>
             <Suspense fallback={<ComponentLoader />}>
                {/* Conditionally show based on mobile tab selection when on mobile */}
                <div className={`${activeMobileTab === 'leaderboard' ? 'block' : 'hidden lg:block'}`}>
                  <Leaderboard />
                </div>
                <div className={`${activeMobileTab === 'notes' ? 'block' : 'hidden lg:block'}`}>
                  <EditorPanel />
                </div>
             </Suspense>
          </div>
        </main>
      </div>

      {/* Global Error Notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, bottom: -50 }}
            animate={{ opacity: 1, bottom: 20 }}
            exit={{ opacity: 0, bottom: -50 }}
            className="fixed left-1/2 -translate-x-1/2 bg-error text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-[200]"
          >
            <span>{error}</span>
            <button 
              onClick={clearError}
              className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



export default App;

