import * as types from "./app.types";

export const createTeam = (trainerName: string) => {
  return {
    type: types.CREATE_TEAM,
    payload: {
      trainerName,
    },
  };
};

export const addPokemonToTeam = (
  teamId: string,
  pokemonId: string,
  pokemonName: string,
  imgSrc: string,
  imgAlt: string,
) => {
  return {
    type: types.ADD_POKEMON_TO_TEAM,
    payload: {
      teamId,
      pokemonId,
      pokemonName,
      imgSrc,
      imgAlt,
    },
  };
};

export const removePokemonFromTeam = (teamId: string, pokemonId: string) => {
  return {
    type: types.REMOVE_POKEMON_FROM_TEAM,
    payload: {
      teamId,
      pokemonId,
    },
  };
};

export const setSelectedTeam = (teamId: string, trainerName: string) => {
  return {
    type: types.SET_SELECTED_TEAM,
    payload: {
      teamId,
      trainerName,
    },
  };
};

export const deleteTeam = (teamId: string) => {
  return {
    type: types.DELETE_TEAM,
    payload: {
      teamId,
    },
  };
};
