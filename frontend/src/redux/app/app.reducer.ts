import { User } from "../../models/user.model";

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
    // case LOAD_USER:
    //   break;
    // case TOGGLE_USER_FAVORITE:
    //   break;
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
