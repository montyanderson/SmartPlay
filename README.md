# SmartPlay

![David DM](https://david-dm.org/montyanderson/SmartPlay.svg)

## Install

* Install Node.js and redis.

* Clone the repository

* Make **config.json**:

``` json
{
    "redis": {
        "port": 6379,
        "ip": "localhost",
        "auth": ""
    }
}
```

* Set your API keys

``` bash
$ redis-cli
127.0.0.1:6379> SET lastfm_id xxx-your-api-key-xxx
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
