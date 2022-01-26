import { useEffect, useReducer } from 'react';
import axios from 'axios';
import PokeContext from './pokeContext';
import PokeReducer from './pokeReducer';

import { SET_LOADING, GET_POKES, GET_POKE, POKE_ERROR } from '../types';

const GithubState = props => {
  // Initial State
  const initialState = {
    pokemons: [],
    poke: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(PokeReducer, initialState);

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // getPokemons();
  const getPokemons = async () => {
    setLoading();
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
      getPoke(res.data.results);

      dispatch({
        type: GET_POKES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: POKE_ERROR, payload: err.response });
    }
  };

  function getPoke(results) {
    setLoading();
    try {
      // loop through result and send request to https://pokeapi.co/api/v2/pokemon/${name} to get single poke details
      results.map(async poke => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke.name}`,
        );

        // dispatching the action GET_POKE
        dispatch({ type: GET_POKE, payload: res.data });
      });
    } catch (err) {
      dispatch({ type: POKE_ERROR, payload: err.response });
    }
  }

  useEffect(() => {
    getPokemons();

    // eslint-disable-next-line
  }, []);

  return (
    <PokeContext.Provider
      value={{
        pokemons: state.pokemons,
        poke: state.poke,
        loading: state.loading,
        error: state.error,
      }}>
      {props.children}
    </PokeContext.Provider>
  );
};

export default GithubState;
