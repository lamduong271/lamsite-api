import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection, ConnectionOptions } from "typeorm";
import { Experience } from "./entities/Experiences";
import { buildSchema } from "type-graphql";
import { ExperienceResolver } from "./resolvers/ExperienceResolver";
import { Education } from "./entities/Education";
import { EducationResolver } from "./resolvers/EducationResolver";


dotenv.config();

const main = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: "postgres",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Experience, Education]
  };
  if (process.env.NODE_ENV !== "development") {

    Object.assign(connectionOptions, {
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  await createConnection(connectionOptions);

  console.log(connectionOptions.host);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ExperienceResolver, EducationResolver],
      validate: false
    }),
    introspection: true,
    playground: true,
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({port: process.env.PORT || 4000}, () =>
    console.log("Now browse to " + process.env.PORT + 'path ' +server.graphqlPath)
  );
};
main().catch(err => {
  console.log(err);
});
