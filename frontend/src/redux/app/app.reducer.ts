import { User } from "../../models/user.model";
import { USER_FETCH, USER_FETCH_FAIL, USER_FETCH_SUCCESS } from "./app.types";

export interface ReduxInitialState {
  user: User | null; // Logged in user data
  fetched: boolean; // Was user fetched?
  fetchedError: boolean; // Error fetching user?
}

const INITIAL_STATE: ReduxInitialState = {
  user: null,
  fetched: false,
  fetchedError: false,
};

const appReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        fetched: action.payload.fetched,
        fetchedError: action.payload.fetchedError,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        fetched: action.payload.fetched,
        fetchedError: action.payload.fetchedError,
      };
    case USER_FETCH_FAIL:
      return {
        ...state,
        fetched: action.payload.fetched,
        fetchedError: action.payload.fetchedError,
      };

    // case types.ADD_POKEMON_TO_TEAM:
    //   return {
    //     ...state,
    //     teams: state.teams.map(team => {
    //       if (team.id === action.payload.teamId) {
    //         return {
    //           ...team,
    //           caughtPokemon: [
    //             ...team.caughtPokemon,
    //             {
    //               id: action.payload.pokemonId,
    //               name: action.payload.pokemonName,
    //               imgSrc: action.payload.imgSrc,
    //               imgAlt: action.payload.imgAlt,
    //             },
    //           ],
    //         };
    //       } else return team;
    //     }),
    //   };
    // case types.CREATE_TEAM:
    //   return {
    //     ...state,
    //     teams: [
    //       {
    //         id: uuidv4(),
    //         trainerName: action.payload.trainerName,
    //         caughtPokemon: [],
    //       },
    //       ...state.teams,
    //     ],
    //   };
    // case types.REMOVE_POKEMON_FROM_TEAM:
    //   return {
    //     ...state,
    //     teams: state.teams.map(team => {
    //       if (team.id === action.payload.teamId) {
    //         return {
    //           ...team,
    //           caughtPokemon: team.caughtPokemon.filter(
    //             pokemon => pokemon.id !== action.payload.pokemonId,
    //           ),
    //         };
    //       } else return team;
    //     }),
    //   };
    // case types.SET_SELECTED_TEAM:
    //   return {
    //     ...state,
    //     activeTeam: {
    //       ...state.activeTeam,
    //       id: action.payload.teamId,
    //       trainerName: action.payload.trainerName,
    //     },
    //   };
    // case types.DELETE_TEAM:
    //   // ? Throw error?
    //   if (state.activeTeam.id === action.payload.teamId) return;

    //   return {
    //     ...state,
    //     teams: state.teams.filter(team => team.id !== action.payload.teamId),
    //   };
    default:
      return state;
  }
};

export default appReducer;
