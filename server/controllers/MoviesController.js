const { getData } = require("../config/dbconfig");

exports.getAllMovies = () => {
    return getData("SELECT * FROM movies");
}

exports.getMovie = (id) => {
    let data = getData(`SELECT * FROM movies WHERE id = ${id}`);
    return data[0];
}

exports.getMovieBy = (field, value) => {
    return getData(`SELECT * FROM movies WHERE ${field} = ${value}`);
}