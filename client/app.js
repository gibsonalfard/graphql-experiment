const express = require("express");
const cors = require("cors");
const http = require("http");
const axios = require("axios");

const app = express();

/* Allow CORS access
1st line -> Allow origin from anywhere
2nd line -> Method permitted to access from anywhere
3rd line -> Header permitted to access and use from anywhere
* */
app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "x-access-token, X-Requested-With, Content-Type, Accept");
    next();
});

// Create server instance
const server = http.createServer(app);

// Create root entry
app.get("/", (req, res) => {
    // Request to GraphQL End-Point using Axios
    // query in data can also be written in a one-line style. Multiline style only use for formatting
    axios({
        url:"http://localhost:8080/api/query",
        method: "get",
        data:{
            query: `
            {
                movies {
                    id,
                    title,
                    rating,
                    director,
                    year
                }
            }`
        }})
        .then(response => {
            res.json(response.data)
        })
        .catch(err => {
            console.log(err.message);
            res.json({"message": "Sorry, there's error in server"});
        })
});

/*Make server listen to some port.
8081 -> Default when no port defined at env variable
* */
const PORT = 8081 || process.env.PORT;
server.listen(parseInt(PORT), () => console.log(`Server running at ${PORT}`));