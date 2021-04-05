import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection, Connection } from "typeorm";

dotenv.config()

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true
  });

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
  );
}
main().catch(err => {
  console.log(err);
})