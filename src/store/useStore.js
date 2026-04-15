import { create } from 'zustand';

// Dummy data extracted from db.json for local simulation
const DUMMY_DATA = {
  projects: [
    {
      id: "1",
      title: "React Dashboard",
      description: "A high-performance dashboard built with Vite and React.",
      category: "Frontend",
      xp: 500
    },
    {
      id: "2",
      title: "API Integration",
      description: "Integrating complex REST APIs with robust error handling.",
      category: "Fullstack",
      xp: 750
    },
    {
      id: "3",
      title: "Animation Suite",
      description: "Creating smooth motion signatures with Framer Motion.",
      category: "UI/UX",
      xp: 600
    },
    {
      id: "4",
      title: "State Management",
      description: "Managing complex application states with Zustand.",
      category: "Architecture",
      xp: 450
    }
  ],
  leaderboard: [
    {
      id: "1",
      name: "Alex Riv",
      score: 12500,
      rank: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      id: "2",
      name: "Jordan Doe",
      score: 11200,
      rank: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
    },
    {
      id: "3",
      name: "Casey Smith",
      score: 9800,
      rank: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey"
    },
    {
      id: "4",
      name: "Taylor Swift",
      score: 8500,
      rank: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor"
    }
  ],
  user: {
    name: "Trial User",
    points: 4200,
    xp: 65,
    level: 12,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
  },
  notes: [
    {
      projectId: "2",
      content: "test",
      timestamp: "2026-04-14T10:55:08.701Z",
      id: "oLsV29id_Ak"
    },
    {
      projectId: "2",
      content: "testing ",
      timestamp: "2026-04-14T11:23:22.909Z",
      id: "mBmRP4YeoYc"
    },
    {
      projectId: "2",
      content: "test\n",
      timestamp: "2026-04-14T11:23:49.533Z",
      id: "sBhIdo0MKNw"
    },
    {
      projectId: "2",
      content: "testingg",
      timestamp: "2026-04-15T12:28:56.282Z",
      id: "bWu44ZMOtis"
    }
  ]
};

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
      // Simulate real network delay for polished UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        projects: DUMMY_DATA.projects, 
        leaderboard: DUMMY_DATA.leaderboard, 
        user: DUMMY_DATA.user,
        notes: DUMMY_DATA.notes,
        loading: false 
      });
    } catch (err) {
      set({ error: 'Failed to load dummy data', loading: false });
    }
  },

  setSelectedProject: (id) => set({ selectedProjectId: id }),

  submitNote: async (projectId, content) => {
    set({ loading: true });
    try {
      // Create new note locally
      const newNote = {
        projectId,
        content,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };

      // Update state locally (simulating the POST response)
      set((state) => ({ 
        notes: [...state.notes, newNote],
        loading: false 
      }));

      return { success: true };
    } catch (err) {
      set({ error: 'Failed to save note', loading: false });
      return { success: false };
    }
  },

  getProjectById: (id) => {
    return get().projects.find(p => p.id === id);
  }
}));

export default useStore;
