var Bookshelf = require('bookshelf');

Bookshelf.Initialize({
    client: 'mysql',
    connection: {
        host: 'catherinecabral.com',
        user: 'cathe',
        password: 'cabral2012',
        database: 'cathe_shop'
        //charset: 'utf8'
    }
});

module.exports = Bookshelf;

//UPDATE cc_produtos SET preco_base = REPLACE(preco_base,',', '.')
//UPDATE cc_produtos SET preco_pvp = REPLACE(preco_pvp,',', '.')
//UPDATE cc_produtos SET preco_transporte = REPLACE(preco_transporte,',', '.')