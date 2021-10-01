import { useCallback, useReducer } from "react";

const ACTIONS = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
  RESET: "RESET",
};

const initState = {
  isLoading: false,
  payload: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.FULFILLED:
      return {
        isLoading: false,
        payload: action.payload,
        error: null,
      };
    case ACTIONS.REJECTED:
      return {
        isLoading: false,
        error: action.payload,
        payload: null,
      };
    case ACTIONS.RESET:
      return initState;
    default:
      return state;
  }
}

export default function useRequest(fetchFunc) {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetch = useCallback(
    (...args) => {
      dispatch({
        type: ACTIONS.PENDING,
      });

      return fetchFunc(...args)
        .then((payload) => {
          dispatch({ type: ACTIONS.FULFILLED, payload });
          return payload;
        })
        .catch((payload) => {
          dispatch({ type: ACTIONS.REJECTED, payload });
          throw payload;
        });
    },
    [dispatch, fetchFunc]
  );

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, [dispatch]);

  return {
    state,
    fetch,
    reset,
  };
}
