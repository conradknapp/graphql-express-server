const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(port = 3030, () => {
  console.log(`Listening on ${port}`);
});