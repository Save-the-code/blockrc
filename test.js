const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const cache = new (require('./cache.js')).Base();

nanoTest.add(
    'creatre cache ',
    {
        'function':cache.create,
        'options':[1024,1024]
    },
    '===',
    true
);

nanoTest.add(
    'cache setString',
    {
        'function':cache.setString,
        'options':['test string', 1]
    },
    '===',
    true
);
nanoTest.add(
    'cache getString',
    {
        'function':cache.getString,
        'options':[1]
    },
    '===',
    'test string'
);
nanoTest.run();






