self.addEventListener("install",e=>{
e.waitUntil(
caches.open("rg-cache").then(c=>{
return c.addAll(["index.html","style.css","script.js"]);
})
);
});
