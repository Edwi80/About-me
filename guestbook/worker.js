// Guestbook Application
// Author: Edwin Berrouet
// Date: 04/16/2025
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // Handle CORS
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (url.pathname === '/api/entries' && request.method === 'GET') {
            try {
                const entries = await env.KV_GUESTBOOK.get('entries', { type: 'json' }) || [];
                return new Response(JSON.stringify(entries), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: 'KV error' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        }

        if (url.pathname === '/api/entries' && request.method === 'POST') {
            try {
                const { name, message } = await request.json();
                const entries = await env.KV_GUESTBOOK.get('entries', { type: 'json' }) || [];
                const newEntry = { name, message, created_at: new Date().toISOString() };
                entries.push(newEntry);
                await env.KV_GUESTBOOK.put('entries', JSON.stringify(entries));
                
                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: 'KV error' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        }

        return new Response('Not found', { status: 404 });
    }
};
