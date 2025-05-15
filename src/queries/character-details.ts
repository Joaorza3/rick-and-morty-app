import gql from 'graphql-tag'

export const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
        episode
        air_date
      }
    }
  }
`
