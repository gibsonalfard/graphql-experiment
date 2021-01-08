const graphql = require("graphql");
const {
    GraphQLScalarType
} = graphql;

const dateFormat = (value) => {
    return new Date(value);
}
// Date Type
const GraphQLDate = new GraphQLScalarType({
    name: "Date",
    serialize: dateFormat
});

module.exports = GraphQLDate;