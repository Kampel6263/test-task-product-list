const isLocalhost=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));!isLocalhost&&"serviceWorker"in navigator&&self.addEventListener("load",(()=>{navigator.serviceWorker.register("/sw.mjs").then((()=>{console.log("[Service Worker] registered")})).catch((o=>{console.log("[Service Worker] error",error)}))}));