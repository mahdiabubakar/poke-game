import React, { useEffect, useState, useContext, Fragment } from 'react';
import PokeItem from './PokeItem';
import PokeContext from '../context/pokemon/pokeContext';
import Spinner from './Spinner';

const Pokes = () => {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [win, setWin] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [clicks, setClicks] = useState(0);

  const pokeContext = useContext(PokeContext);

  const { pokemons, loading } = pokeContext;

  //currently there are 4 pokemons but we need the pair
  const pairOfPokemons = [...pokemons, ...pokemons];

  function flipCard(index) {
    if (win) {
      setWin(false);
      setPairs([]);
      setClicks(0);
    }
    setOpenedCard(opened => [...opened, index]);

    setClicks(clicks + 1);
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfPokemons[openedCard[0]];
    const secondMatched = pairOfPokemons[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
      setPairs([...pairs, secondMatched, firstMatched.id]);
      setWin(true);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
    // eslint-disable-next-line
  }, [openedCard]);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', padding: '15px' }}>Poke Game</h1>
      <div className='cards'>
        {pairOfPokemons.map((pokemon, index) => {
          //lets flip the card

          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;
          return (
            <div
              className={`pokemon-card ${isFlipped ? 'flipped' : ''} `}
              key={index}
              onClick={() => flipCard(index)}>
              <PokeItem pokemon={pokemon} />
            </div>
          );
        })}
      </div>
      <div className='stats' style={{ marginTop: '20px', textAlign: 'center' }}>
        {win && (
          <>
            Yo! you won the game! Congratulations!
            <br />
            Click any card to play again.
            <br />
            <br />
          </>
        )}
        Clicks: {clicks} <br /> Found pairs:{' '}
        {pairs.length > 0 ? (
          <strong>{pairs.length / 2}</strong>
        ) : (
          <>
            {' '}
            <br /> No pair found
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Pokes;
