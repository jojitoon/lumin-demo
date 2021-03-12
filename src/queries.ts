import { gql } from '@apollo/client';
export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
  }
`;
