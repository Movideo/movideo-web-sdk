# Movideo Web SDK

Movideo's Media API allows developers to interact with the platform through web-services. The API's are based on the REST principles. Where each request can be an HTTP POST or GET, and the response is a gzipped content (If client specified that gzip is supported in its HTTP Headers).

## Installation

```
npm install movideo-web-sdk
```

## API Overview

### Available resources & methods

*Where you see params it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

 * media
  * get(mediaId[, params])
  * mostPlayedDay([params])
  * mostPlayedWeek([params])
  * mostPlayedMonth([params])
  * cuePoints(mediaId)
  * related(mediaId[, params])
  * totals()
  * images(mediaId)
  * search([params])
 * application
  * get()
  * config()
 * playlist
  * get(id[, params])
  * media(id[, params])
  * images(id)
  * playlists(id[, params])
  * root([id, params])
 * tag
  * search(tag[, params])
  * profile(tagId)
  * profileSearch(keyword[, params])

## Configuration

* `Movideo.setKey('your api key');`
* `Movideo.setAlias('your app alias');`
* `Movideo.refreshSession();` this is a shortcut to Movideo.session.refresh()


## Development

To run the tests you'll need a Movideo *Test* API key (from your [Movideo Dashboard](https://manage.movideo.com)):

```bash
$ npm install -g mocha
$ npm test
```

## Author

Originally by Milos Dakic (hello@milosdakic.com). Development was sponsored by Authentic Entertainment.