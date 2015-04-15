# Movideo Web SDK

Movideo's Media API allows developers to interact with the platform through web-services. The API's are based on the REST principles. Where each request can be an HTTP POST or GET, and the response is a gzipped content (If client specified that gzip is supported in its HTTP Headers).

## Installation

```
npm install movideo-web-sdk
```

## API Overview

### Available resources & methods

*Where you see params it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

 * session
  * get()

## Configuration

* `Movideo.setApiKey('your api key');`
* `Movideo.setApiAlias('your app alias');`


## Development

To run the tests you'll need a Movideo *Test* API key (from your [Movideo Dashboard](https://manage.movideo.com)):

```bash
$ npm install -g mocha
$ npm test
```

## Author
Originally by Milos Dakic (hello@milosdakic.com). Development was sponsored by Authentic Entertainment.