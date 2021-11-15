importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
/**
 * Workbox constructor:
 * core, strategies, routing
 */
self.skipWaiting();
workbox.core.clientsClaim();
/**
 * Register route for css, js files
 * [Cache]: assets
 */
workbox.routing.registerRoute(
  /\.(?:css|js)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets'
  })
);

/**
 * For any media extension provided here you can cache and store it
 * [Cache]: images
 */
workbox.routing.registerRoute(
  /\.(?:png|jpg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images'
  })
);
/**
 * This route allows us to cache react routing as we don't receive any .html files
 */
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
workbox.routing.registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false;
    }

    if (url.pathname.startsWith('/_')) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'pages'
  })
);
/**
 * Register requests
 */
workbox.routing.registerRoute((req, url) => {
  if (req.url.origin === 'https://localhost:8288/special-route') return true;
}, new workbox.strategies.NetworkFirst({ cacheName: 'api' }));

/**
 * Register post route with background sync
 */
workbox.routing.registerRoute(
  new RegExp('^http://localhost:8288'),
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin('ApiPostQueue', {
        maxRetentionTime: 24 * 60
      })
    ]
  }),
  'POST'
);

/**
 * Register get route with background sync plugin
 */
workbox.routing.registerRoute(
  new RegExp('^https://jsonplaceholder.typicode.com'),
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin('ApiGetQueue', {
        maxRetentionTime: 24 * 60
      })
    ]
  }),
  'GET'
);
