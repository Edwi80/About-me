Guestbook Application
This is a simple guestbook application built with Cloudflare Pages and Workers, using KV for data storage. Users can submit their name and message, which are stored and displayed on the page.
Features

Submit name and message through a form
View all guestbook entries
Data persistence using Cloudflare KV
RESTful API handled by Cloudflare Worker
Responsive frontend with separated HTML and CSS

Project Structure

guestbook/index.html: Frontend HTML
guestbook/styles.css: Frontend CSS
guestbook/worker/worker.js: Cloudflare Worker script for API endpoints
wrangler.toml: Worker configuration
package.json: NPM scripts for deployment and development
research.md: Research summaries
README.md: This file
.gitignore: Excludes unnecessary files

Setup and Deployment

Clone the repository:
git clone https://github.com/Edwi80/About-me.git
cd About-me


Install dependencies:
npm install


Set up Cloudflare Pages:

Create a new Pages project in Cloudflare
Connect to your GitHub repository (Edwi80/About-me)
Set build output directory to guestbook/
Deploy the static files (index.html, styles.css)


Set up Cloudflare Worker:

Create a KV namespace:npx wrangler kv:namespace create KV_GUESTBOOK


Update wrangler.toml with the KV namespace ID
Deploy the Worker:npm run deploy


Add a route in the Cloudflare dashboard: <your-pages-url>/guestbook/api/*


Test locally:
npm run dev


Access http://localhost:8787/guestbook/
Test API with curl:curl -X POST http://localhost:8787/guestbook/api/entries -H "Content-Type: application/json" -d '{"name":"Test","message":"Hello"}'
curl -X GET http://localhost:8787/guestbook/api/entries





Notes

The Worker handles GET and POST requests for the /api/entries endpoint
CORS headers are included for cross-origin requests
The frontend uses the Fetch API to communicate with the Worker
KV stores entries as a JSON array
Files are in the guestbook/ subdirectory to avoid conflicts with the resume site

Deployed URL
[To be added after deployment]
