import { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

// Define o tipo de dados para o objeto
const dataType = new GraphQLObjectType({
  name: 'Data',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    info: { type: GraphQLString } // Se desejar, pode definir um tipo GraphQL separado para 'info'
  })
});

// Define uma consulta para obter todos os itens
const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    data: {
      type: dataType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return data.find(item => item.id === args.id);
      }
    }
  }
});

// Define o esquema GraphQL
const schema = new GraphQLSchema({
  query: rootQuery
});

export default schema;

