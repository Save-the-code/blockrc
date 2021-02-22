'use strict'


const cache = new (require('./cache.js')).Base();

cache.create(1024, 1024);
cache.set('cool', 10);
console.log(
    cache.getString(10)
);

