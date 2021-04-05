import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { createConnection, getRepository } from "typeorm"
import {Experience} from './entities/Experiences'
import { buildSchema } from "type-graphql"
import { ExperienceResolver } from './resolvers/Experience'

dotenv.config()

const main = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Experience]
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ExperienceResolver],
      validate: false
    })
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
  );
}
main().catch(err => {
  console.log(err);
})