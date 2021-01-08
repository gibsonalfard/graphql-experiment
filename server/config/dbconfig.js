const { Pool } = require("pg");

const postgres = new Pool({
    user: "postgres",
    host: "localhost",
    database: "graphql_source",
    password: "mypassword",
    port: 5432
});

const getData = (query) => {
    try{
        return new Promise(resolve => {
            postgres.query(query, (err, res) => {
                resolve(res.rows);
            });
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = {postgres, getData};