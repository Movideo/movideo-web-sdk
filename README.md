# Movideo Web SDK

Movideo's Media API allows developers to interact with the platform through web-services. The API's are based on the REST principles. Where each request can be an HTTP POST or GET, and the response is a gzipped content (If client specified that gzip is supported in its HTTP Headers).

## Installation

```
npm install movideo-web-sdk
```

## API Overview

Every resource is accessed via your `movideo` instance:
```js
var movideo = require('movideo-web-sdk')('key', 'alias');
// movideo.{ RESOURCE }.{ METHOD }
```

Every resource method accepts an optional callback as the last argument:
```js
movideo.media.retrieve(80254, function(error, media) {
  error; // null if no error occured
  media; // the media object
});
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback:
```js
movideo.media.retrieve(80254)
.then(function(media) {
  return media;
}, function(error) {
  // deal with an error
});
```

### Available resources & methods

*Where you see params it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

 * application
  * retrieve()
 * media
  * retrieve(id[, params])
  * daily([params])
  * weekly([params])
  * monthly([params])
  * cuepoints(id)
  * images(id)
  * related(id[, params])
  * total()

 * playlist
  * retrieve(id[, params])
  * media(id[, params])
  * images(id)
  * playlists(id[, params])
  * root([id, params])
 * tag
  * search(tag[, params])
  * profile(tagId)
  * profileSearch(keyword[, params])
 * session
  * get(key, alias)

## Configuration

Avaliable methods

* `Movideo.setHost(host);`
* `Movideo.setPost(port);`
* `Movideo.setAlias(alias);`
* `Movideo.setKey(key);`
* `Movideo.setTimeout(ms);` (default is node's default: `120000ms`)
* `Movideo.setFormat(json/xml);`
* `Movideo.setToken(token);`


## Development

To run the tests you'll need a Movideo *Test* API key (from your [Movideo Dashboard](https://manage.movideo.com)):

```bash
$ npm install -g mocha
$ npm test
```

## Author

Originally by Milos Dakic (hello@milosdakic.com). Development was sponsored by Authentic Entertainment.