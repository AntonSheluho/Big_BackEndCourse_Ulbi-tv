const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'Km#4~7H"',
    hosl: 'localhost',
    port: '5432'
})

module.export = pool