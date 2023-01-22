export const operationPokemon = `
  query MyQuery($where: pokemon_bool_exp) {
    pokemon (where: $where) {
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
`;