import knex from 'knex';
import path from 'path';

//migrations - contra as versoes dos bancos de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
    
});


export default db;