# yrs2015

## Install

* Install Node.js and redis.

* Clone the repository

* Make **config.json**:

``` json
{
    "lastfm": "xxx-lastfm-api-key-xxx",
    "redis": {
        "port": 6379,
        "ip": "localhost",
        "auth": ""
    }
}
```

* Install the dependencies

``` bash
npm install
```

* Run the app!

``` bash
node server
```

## Development

* Automatically compile browserify and less scripts/styles

``` bash
npm run dev
```

* Automatically restart the node server on file change

``` bash
npm install nodemon -g
nodemon server
```
