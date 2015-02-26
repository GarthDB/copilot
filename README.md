# copilot
A custom front end for Nightscout's Healthcare Portal

I have not yet hit a minimal viable product (mvp), so I am working just on master, for now.

For local testing, I am allowing full cross domain stuff in my local nightscout.

In my server.js file I've added this (not recommended for production code). When I hit an mvp I'll be setting up a way to move it over to nightscout.
``` javascript
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
```
For now, Copilot is being designed for use with a vertical iPad. More work on other products/orientations to come.
