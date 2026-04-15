# Trial Dashboard - Frontend Developer Submission

A pixel-perfect, highly responsive dashboard built with **Vite**, **React**, **Zustand**, and **Framer Motion**. This submission implements all mandatory requirements and several enhancements focused on performance and mobile UX.

## 🚀 Key Features

- **Adaptive Responsive Layout**: 
  - **Desktop**: Three-column grid with persistent sidebar and interactive panels.
  - **Mobile/Tablet**: Implements a **Mobile Drawer** for global navigation and a **Tabbed Content Switcher** (Projects, Leaderboard, Notes) to maximize screen efficiency.
- **State Management**: Centralized global state using **Zustand**, featuring selective selectors to minimize re-renders.
- **API Integration**: fully integrated with a mock API (persistent `db.json` via json-server).
- **Rich Animations**: Fluid transitions, pill-tab switching animations, and interactive progress bars powered by **Framer Motion**.
- **Performance Optimized**: 
  - **Lazy Loading**: sidebar panels are loaded on demand.
  - **Memoization**: Core components wrapped in `React.memo`.
  - **Selective Selectors**: Components only re-render when their specific data slice changes.

## 📁 Component Structure

- `App.jsx`: Global orchestration, responsive grid definitions, and mobile navigation state.
- `Sidebar.jsx`: Adaptive navigation (Persistent on Desktop, Drawer on Mobile).
- `Header.jsx`: User profile, points synchronization, and mobile toggle integration.
- `ProgressSection.jsx`: Globally visible animated XP progress tracking.
- `ProjectList.jsx`: Scrollable project feed with selection logic and category icons.
- `Leaderboard.jsx`: Ranked user list featuring top-player highlighting and rank badges.
- `EditorPanel.jsx`: Dynamic project details view and AJAX-based note submission tracking.

## 🛠️ Tech Stack

- **Framework**: Vite + React
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Mock API**: json-server
- **Styles**: Vanilla CSS (TailwindCSS for layout utilities)

## 🏗️ State Management Approach

I opted for **Zustand** due to its minimal boilerplate and exceptional performance with selective selectors. The store handles:
1. **Asynchronous Orchestration**: centralized loading and error states for all API requests.
2. **Entity Management**: synced state for projects, the leaderboard, and the user profile.
3. **UI State**: tracking active tabs (global and mobile-specific) and selection persistence.

## 🔌 API Integration

The application interacts with a mock backend providing the following endpoints:
- `GET /projects`: Populates the main project feed.
- `GET /leaderboard`: Retrieves ranked competitor data.
- `GET /user`: Syncs the authenticated user's XP, level, and points.
- `POST /notes`: Persists progress updates for specifically selected projects.

## 📦 Setup & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Mock API**:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
3. **Start Dev Server**:
   ```bash
   npm run dev
   ```

