import { useEffect, useReducer } from 'react';
import axios from 'axios';
import PokeContext from './pokeContext';
import PokeReducer from './pokeReducer';

import { SET_LOADING, CLEAR_POKES, GET_POKES, GET_POKE } from '../types';

const GithubState = props => {
  const initailState = {
    pokemons: [],
    poke: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(PokeReducer, initailState);

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Clear Users
  const clearPokes = () => dispatch({ type: CLEAR_POKES });

  // getPokemons();
  const getPokemons = async () => {
    setLoading();
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');

    getPoke(res.data.results);

    dispatch({
      type: GET_POKES,
      payload: res.data,
    });
  };

  function getPoke(results) {
    setLoading();
    results.map(async poke => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${poke.name}`,
      );

      dispatch({ type: GET_POKE, payload: res.data });
    });
  }

  useEffect(() => {
    getPokemons();

    // eslint-disable-next-line
  }, []);

  // console.log(state.pokes.results);

  return (
    <PokeContext.Provider
      value={{
        pokemons: state.pokemons,
        poke: state.poke,
        loading: state.loading,
        clearPokes,
      }}>
      {props.children}
    </PokeContext.Provider>
  );
};

export default GithubState;
