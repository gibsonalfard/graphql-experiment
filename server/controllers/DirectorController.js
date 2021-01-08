const { getData } = require("../config/dbconfig");

exports.getAllDirector = () => {
    return getData("SELECT * FROM directors");
}

exports.getDirector = (id) => {
    let data = getData(`SELECT * FROM directors WHERE id = ${id}`);
    return data[0];
}

exports.getDirectorBy = (field, value) => {
    return getData(`SELECT * FROM directors WHERE ${field} = ${value}`);
}