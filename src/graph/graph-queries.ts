export const operationPokemon = `
  query MyQuery($where: daily_pokemon_bool_exp) {
    pokemon: daily_pokemon(where: $where) {
      pokemon {
        id
        height
        name
        order
        sprites {
          front_default
          front_shiny
        }
        types {
          color
          name
        }
        weight
        flavors {
          language
          text
        }
      }
    }
  }
`;