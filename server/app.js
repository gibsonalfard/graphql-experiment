const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const cors = require("cors");
const http = require("http");
const schema = require("./schema/schema");
const { postgres } = require("./config/dbconfig");

const app = express();

/* Allow CORS access
1st line -> Allow origin from anywhere
2nd line -> Method permitted to access from anywhere
3rd line -> Header permitted to access and use from anywhere
* */
app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, X-Requested-With, Content-Type, Accept")
    next();
});

// Create server
const server = http.createServer(app);

// Create GraphQL End-point
app.use("/api/query", graphqlHTTP({
    schema, graphiql: true
}));

// Create Normal End-Point
app.get("/", (req, res) => {
    postgres.query("SELECT * FROM movies", (err, res) => {
        console.log(res.rows);
    });
    res.json({"message": "200"});
});

/*Make server listen to some port.
8080 -> Default when no port defined at env variable
* */
const PORT = 8080 || process.env.PORT;
server.listen(parseInt(PORT), () => console.log(`Server running at ${PORT}`));