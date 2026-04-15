import React, { useState, memo } from 'react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

const EditorPanel = () => {
  // Use selective selectors to optimize rendering
  const selectedProjectId = useStore(state => state.selectedProjectId);
  const project = useStore(state => state.projects.find(p => p.id === selectedProjectId));
  const submitNote = useStore(state => state.submitNote);
  const loading = useStore(state => state.loading);

  const [noteContent, setNoteContent] = useState('');
  const [feedback, setFeedback] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const result = await submitNote(selectedProjectId, noteContent);
    if (result.success) {
      setFeedback({ type: 'success', message: 'Note submitted successfully!' });
      setNoteContent('');
    } else {
      setFeedback({ type: 'error', message: 'Failed to submit note. Please try again.' });
    }

    setTimeout(() => setFeedback({ type: null, message: '' }), 3000);
  };

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-text-secondary glass-panel">
        <Info size={48} className="mb-4 opacity-50" />
        <p className="max-w-[200px] leading-relaxed">Select a project from the list to view details and add notes.</p>
      </div>
    );
  }

  return (
    <div className="flex-[1.2] flex flex-col p-4 gap-3 min-h-0 glass-panel">
      <div className="project-header">
        <div className="flex items-center gap-2 text-accent-primary mb-0.5">
          <FileText size={14} />
          <span className="text-[0.7rem] font-bold uppercase tracking-wider">Project Details</span>
        </div>
        <h2 className="text-lg font-bold font-display leading-tight">{project.title}</h2>
        <p className="text-text-secondary mt-0.5 text-[0.8rem] leading-snug line-clamp-2">
          {project.description}
        </p>
      </div>

      <hr className="border-none border-t border-border" />

      <div className="flex-1 flex flex-col gap-2 min-h-0">
        <h3 className="text-[0.85rem] font-semibold">Add Progress Note</h3>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write what you've accomplished..."
            className="flex-1 bg-surface border border-border rounded-xl p-2.5 text-text-primary font-sans text-[0.8rem] resize-none outline-none transition-all focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 custom-scrollbar"
          />
          
          <div className="flex justify-between items-center gap-3">
            <div className="h-4 flex-1">
              <AnimatePresence>
                {feedback.message && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`text-[0.75rem] flex items-center gap-1 font-medium
                      ${feedback.type === 'success' ? 'text-success' : 'text-error'}`}
                  >
                    {feedback.type === 'success' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !noteContent.trim()}
              className="flex items-center gap-1.5 py-1 px-4 rounded-lg bg-linear-to-br from-accent-primary to-accent-secondary text-white font-bold text-[0.8rem] transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-primary/20"
            >
              {loading ? '...' : 'Submit'}
              <Send size={12} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );


};

export default memo(EditorPanel);

