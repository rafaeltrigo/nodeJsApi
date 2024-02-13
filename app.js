import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js'; // Importa o esquema GraphQL que você definiu

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // Define para habilitar o GraphiQL, uma interface gráfica para testar consultas GraphQL
}));

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor GraphQL rodando em http://localhost:${port}/graphql`);
});
