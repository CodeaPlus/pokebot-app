export const operationPokemon = `
  query PokebotQuery($where: pokemon_bool_exp) {
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

export const operationPokemonRandom = `
  query PokebotQuery {
    randomPokemon: random_pokemon {
      flavors
      height
      id
      isShiny: is_shiny
      name
      order
      sprites
      types
      weight
    }
  }
`;

export const getPokeUserCard = `
  query PokeGet($where: user_cards_bool_exp) {
    userCards: user_cards(where: $where) {
      image
      discordUserId
      avatarUrl
      attachmentId
      month
      id
      day
      type
      username
      pokemonId
      pokemon {
        flavors {
          language
          text
        }
        height
        id
        name
        sprites {
          frontDefault: front_default
          frontShiny: front_shiny
        }
        types {
          color
          name
        }
        weight
      }
    }
  }
`;