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
});

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
    },
    people: {
      type: new GraphQLList(PERSON_TYPE),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/people/`)
          .then(res => res.data)
      }
    }, 
  }
});

const MUTATION = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: PERSON_TYPE,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/people', {
          name: args.name,
          email: args.email,
          password: args.password
        })
        .then(res => res.data)
      }
    },
    deletePerson: {
      type: PERSON_TYPE,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args) {
        return axios.delete(`http://localhost:3000/people/${args.id}`)
        .then(res => res.data)
        .catch(err => console.err(err));
      }
    },
    editPerson: {
      type: PERSON_TYPE,
      args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/people/${args.id}`, args)
        .then(res => res.data)
        .catch(err => console.err(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: ROOT_QUERY,
  mutation: MUTATION
});