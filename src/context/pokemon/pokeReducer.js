import { SET_LOADING, GET_POKES, GET_POKE, POKE_ERROR } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_POKES:
      return {
        ...state,
        pokes: action.payload,
        loading: false,
      };
    case GET_POKE:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        loading: false,
      };

    case POKE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
