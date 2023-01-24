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

export const getPokeUserCard = `
  query PokeGet($where: user_cards_bool_exp) {
    userCards: user_cards(where: $where) {
      attachmentId
      avatarUrl
      day
      discordUserId
      id
      image
      month
      pokemonId
      type
      username
    }
  }
`;