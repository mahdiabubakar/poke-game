import React, { useReducer } from 'react';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, timeout = 5000) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
