﻿var Bookshelf = require('bookshelf');

Bookshelf.Initialize({
    client: 'mysql',
    connection: {
        host: 'myhost.com',
        user: 'cathe',
        password: 'username',
        database: 'password'
        //charset: 'utf8'
    }
});

module.exports = Bookshelf;

//UPDATE cc_produtos SET preco_base = REPLACE(preco_base,',', '.')
//UPDATE cc_produtos SET preco_pvp = REPLACE(preco_pvp,',', '.')
//UPDATE cc_produtos SET preco_transporte = REPLACE(preco_transporte,',', '.')
