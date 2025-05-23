import gql from 'graphql-tag'

export const LIST_CHARACTERS_QUERY = gql`
  query ListCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
          dimension
        }
        location {
          id
          name
          type
          dimension
        }
        image
        episode {
          id
          name
          air_date
          episode
        }
        created
      }
    }
  }
`
