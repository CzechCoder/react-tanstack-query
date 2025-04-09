import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Conversion types table from Prisma to GraphQL
//----------------------------------------------
// id Int @id /	id: ID!	Use ID! for primary keys
// name String /	name: String!	Required string
// description? /	description: String	Optional field → no !
// price Decimal /	price: Float!	You can use Float, or custom scalar
// category? /	category: String	Optional string
// stock Int /	stock: Int!	Required integer
// image_url? /	imageUrl: String	Rename field to camelCase
// created_at? /	createdAt: String

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: `
    type Product {
      id: ID!
      name: String!
      description: String
      price: Float!
      category: String!
      stock: Int!
      image_url: String!
      created_at: String!
    }

    type Query {
      products: [Product]!
      product(id: ID!): Product
    }

    type Mutation {
      updateProduct(
      id: ID!
      name: String!
      description: String
      price: Float
      category: String
      stock: Int!
      image_url: String
      ): Product
    }
  `,
    resolvers: {
      Query: {
        products: async () => await prisma.products.findMany(),
        product: async (_: any, { id }: { id: string }) =>
          await prisma.products.findUnique({ where: { id: Number(id) } }),
      },
      Mutation: {
        updateProduct: async (
          _: any,
          {
            id,
            ...data
          }: {
            id: string;
            name?: string;
            description?: string;
            price?: number;
            category?: string;
            stock?: number;
          }
        ) => {
          return await prisma.products.update({
            where: { id: Number(id) },
            data,
          });
        },
      },
    },
  }),
});

export const GET = (req: Request) => handleRequest(req, {});
export const POST = (req: Request) => handleRequest(req, {});
