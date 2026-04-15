import { create } from 'zustand';

const API_BASE = 'http://localhost:3001';

const useStore = create((set, get) => ({
  projects: [],
  leaderboard: [],
  user: null,
  selectedProjectId: null,
  loading: false,
  error: null,
  notes: [],

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const [projectsRes, leaderboardRes, userRes] = await Promise.all([
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/leaderboard`),
        fetch(`${API_BASE}/user`)
      ]);
      
      const projects = await projectsRes.json();
      const leaderboard = await leaderboardRes.json();
      const user = await userRes.json();

      set({ projects, leaderboard, user, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch data from API', loading: false });
    }
  },

  setSelectedProject: (id) => set({ selectedProjectId: id }),

  submitNote: async (projectId, content) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, content, timestamp: new Date().toISOString() }),
      });
      const newNote = await response.json();
      set((state) => ({ 
        notes: [...state.notes, newNote],
        loading: false 
      }));
      return { success: true };
    } catch (err) {
      set({ error: 'Failed to submit note', loading: false });
      return { success: false };
    }
  },

  getProjectById: (id) => {
    return get().projects.find(p => p.id === id);
  }
}));

export default useStore;
