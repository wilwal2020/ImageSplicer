// Service worker that serves the spliced image at a real, named URL so the
// browser's right-click "Save image as" suggests the chosen file name.
// (Chromium/Edge derive that name from the URL's last path segment.)

const PREFIX = 'saved/'; // requests under <scope>/saved/<name> are served from memory
let current = null;      // { pathname, name, blob }

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('message', (e) => {
  const data = e.data || {};
  if (data.type === 'store') {
    current = {
      pathname: new URL(data.url).pathname,
      name: data.name,
      blob: data.blob,
    };
    // Acknowledge so the page only sets the <img> src once we're ready.
    if (e.ports && e.ports[0]) e.ports[0].postMessage({ ok: true });
  }
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (!url.pathname.includes('/' + PREFIX)) return;
  if (current && url.pathname === current.pathname) {
    e.respondWith(new Response(current.blob, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="' + current.name + '"',
        'Cache-Control': 'no-store',
      },
    }));
  }
});
