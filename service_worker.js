
self.addEventListener("fetch", function (event) {
  // console.log(self.location, event.request.url)
  const requestUrl = new URL(event.request.url);
  const headers = event.request.headers;
  console.log(requestUrl,headers)
  if (event.request.url.startsWith(self.location.origin+"/viewer/")) {
    // console.log(self.location)
    event.respondWith(
      new Response("<h1>Hello World</h1>", { headers: { 'Content-Type': "text/html" } })
    );
  }
});

