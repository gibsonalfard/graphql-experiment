const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLFloat
} = graphql;

let movies = [
    {id: 1, title: "About Time", rating: 7.8, director: "Richard Curtis", year: "2016", genre:["Comedy", "Fantasy", "Drama"]},
    {id: 2, title: "Flipped", rating: 7.7, director: "Rob Reiner", year: "2010", genre:["Comedy", "Romance", "Drama"]},
    {id: 3, title: "You Are the Apple of My Eye", rating: 7.6, director: "Giddens Ko", year: "2011", genre:["Comedy", "Romance", "Drama"]},
    {id: 4, title: "Be With You", rating: 7.7, director: "Jang-Hoon Lee", year: "2018", genre:["Romance", "Fantasy", "Drama"]},
    {id: 5, title: "Let Me Eat Your Pancreas", rating: 7.1, director: "Sho Tsukikawa", year: "2017", genre:["Romance", "Drama"]},
];

const getMovie = (args) => {
    let film = null;
    movies.some(movie => {
        if(args === movie.id){
            film = Object.create(movie);
        }
    });

    return film;
}

const getAllMovies = () => {
    return movies;
}

/* Create GraphQL Schema object --- Start
Note : All fields you want to share have to define in Object Schema. It's possible to not share some fields
using GraphQL, but all fields that not defined in schema cannot be accessed by client
*/
const MovieObject = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        rating: {type: GraphQLFloat},
        director: {type: GraphQLString},
        year: {type: GraphQLString},
        genre: {type: new GraphQLList(GraphQLString)} // Create List of String
    }),
});
/* Create GraphQL Schema object --- End */

/* Create root query for enable querying using GraphQL */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie:{
            type: MovieObject,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return getMovie(args.id);
            }
        },
        movies:{
            type: new GraphQLList(MovieObject),
            resolve() {
                return getAllMovies();
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery});