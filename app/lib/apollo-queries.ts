import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      category
      stock
      image_url
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      category
      stock
      image_url
    }
  }
`;

// Declare the mutation operation and pass variables into it (prefixed with $), similar to JS function
// Inside the mutation body call updateProduct function in the resolver (in route.ts).
// Then assign variables to arguments of which values we're changing (using Prisma)
// In the last {} the function returns id and name(return payload)
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String!
    $description: String
    $price: Float
    $category: String
    $stock: Int!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      category: $category
      stock: $stock
    ) {
      id
      name
    }
  }
`;
