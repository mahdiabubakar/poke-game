import React, { Fragment } from 'react';

const PokeItem = ({ pokemon: { name, id, sprites, types } }) => {
  return (
    <Fragment>
      <div className='inner'>
        <div className='front'>
          <p>#{id}</p>
          <img src={sprites.other.dream_world.front_default} alt={name} />
          <div>
            <h3>{name}</h3>
            <small>Type: {types[0].type.name}</small>
          </div>
        </div>
        <div className='back' />
      </div>
    </Fragment>
  );
};

export default PokeItem;
