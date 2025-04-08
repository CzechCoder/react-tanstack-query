import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      stock
      theme
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
      stock
      theme
    }
  }
`;
