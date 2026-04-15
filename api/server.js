import { createApp } from 'json-server/lib/app.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database
const adapter = new JSONFile(path.resolve(__dirname, '../db.json'));
const db = new Low(adapter, {});

// Pre-read database for serverless environment
await db.read();

// Create the tinyhttp app
const app = createApp(db);

// Export the handler for Vercel
export default app.handler;

// For local development
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const port = 3001;
    app.listen(port, () => {
        console.log(`JSON Server (Beta) is running on http://localhost:${port}`);
    });
}
