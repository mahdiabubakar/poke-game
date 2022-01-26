import React, { useEffect, useState, useContext, Fragment } from 'react';
import PokeItem from './PokeItem';
import PokeContext from '../context/pokemon/pokeContext';
import Spinner from './Spinner';
import AlertContext from '../context/alert/alertContext';

const Pokes = () => {
  const [cardOpen, setCardOpen] = useState([]);
  const [match, setMatch] = useState([]);
  const [win, setWin] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [clicks, setClicks] = useState(0);

  const pokeContext = useContext(PokeContext);
  const alertContext = useContext(AlertContext);

  const { pokemons, loading, error } = pokeContext;

  const { alert, setAlert } = alertContext;
  //currently there are 4 pokemons but we need the pair
  const pairOfPokemons = [...pokemons, ...pokemons];

  function flipCard(index) {
    if (win) {
      setWin(false);
      setPairs([]);
      setClicks(0);
    }
    setCardOpen(opened => [...opened, index]);

    setClicks(clicks + 1);
  }

  useEffect(() => {
    if (cardOpen < 2) return;

    const firstMatch = pairOfPokemons[cardOpen[0]];
    const secondMatch = pairOfPokemons[cardOpen[1]];

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatch([...match, firstMatch.id]);
      setPairs([...pairs, secondMatch, firstMatch.id]);
      setWin(true);
      setAlert('You have win');
    }

    if (cardOpen.length === 2) setTimeout(() => setCardOpen([]), 1000);
    // eslint-disable-next-line
  }, [cardOpen]);

  if (loading) return <Spinner />;

  if (error)
    return (
      <h1 className='error' style={{ height: '100vh', alignItems: 'center' }}>
        Something went wrong
      </h1>
    );
  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', padding: '15px' }}>Poke Game</h1>
      {alert && <p className='alert'>{alert.msg}</p>}
      <div className='cards'>
        {pairOfPokemons.map((pokemon, index) => {
          //lets flip the card

          let isFlipped = false;

          if (cardOpen.includes(index)) isFlipped = true;
          if (match.includes(pokemon.id)) isFlipped = true;
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
