const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const PERSON_TYPE = new GraphQLObjectType({
  name: 'Person',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  })
}) 

const ROOT_QUERY = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    person: {
      type: PERSON_TYPE,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/people/${args.id}`)
          .then(res => res.data)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: ROOT_QUERY
});