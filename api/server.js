import { createApp } from 'json-server/lib/app.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Initialize database
// Using process.cwd() is more reliable on Vercel to find the root directory
const dbPath = join(process.cwd(), 'db.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, {});

// Pre-read database for serverless environment
// We do this at the top level so it's ready when the function handles a request
try {
    await db.read();
    db.data ||= {}; // Ensure data exists
} catch (error) {
    console.error('Failed to read db.json:', error);
}

// Create the tinyhttp app
const app = createApp(db);

// Export the handler for Vercel
export default function (req, res) {
    // Strip /api prefix if it exists to allow json-server to match resources correctly
    // Vercel routes /api/projects -> this function, which sees "/api/projects"
    // json-server expects "/projects"
    if (req.url.startsWith('/api')) {
        req.url = req.url.replace('/api', '');
        // If the URL was exactly "/api", set it to "/"
        if (req.url === '') req.url = '/';
    }

    // Call the tinyhttp app handler
    return app.handler(req, res);
}

// For local development (e.g., node api/server.js)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const port = 3001;
    app.listen(port, () => {
        console.log(`JSON Server (Beta) is running locally on http://localhost:${port}`);
    });
}
