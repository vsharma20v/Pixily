console.log("SW Registered ");

let cacheData = "version 1";
const self = this;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheData).then((c) => {
      c.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/images/favicon.ico",
        "/index.html",
        "/search",
        "/favourites",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  if (!navigator.onLine) {
    e.respondWith(
      caches.match(e.request).then((result) => {
        if (result) {
          return result;
        }
        let requestUrl = e.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
