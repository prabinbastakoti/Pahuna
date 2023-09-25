import { createContext, useEffect, useReducer, useState } from 'react';
import userService from '../services/userService';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [ready, setready] = useState(false);

  useEffect(() => {
    if (!state.user) {
      userService.getUser().then((data) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        setready(true);
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        ready,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
