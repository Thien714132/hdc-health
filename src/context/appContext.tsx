/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useReducer,
  createContext,
  useEffect,
  Dispatch,
  useState,
} from 'react';
import { initialState } from './state';
import { reducer } from './reducer';
import { APPLICATION_ACTION_TYPE } from './action';

export type Action = {
  type: string;
  payload: any;
};

type ContextType = {
  appState: AppState;
  dispatch: Dispatch<Action>;
  filterOptions: any;
  updateFilterOption: (data: any) => void;
};

// Create a new context
export const AppContext = createContext<ContextType>({
  appState: initialState,
  dispatch: () => null,
  filterOptions: {},
  updateFilterOption: () => null,
});

export const AppProvider = ({ children }: any) => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const [filterOptions, setFilterOptions] = useState({});

  // ✅ Load state from localStorage when the component mounts
  useEffect(() => {
    const loadState = () => {
      if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('appState');
        if (savedState) {
          dispatch({
            type: APPLICATION_ACTION_TYPE.LOAD_STATE,
            payload: { ...initialState, ...JSON.parse(savedState) },
          });
        }
      }
    };
    loadState();
  }, []);

  // ✅ Save state to localStorage whenever `appState` changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appState', JSON.stringify(appState));
    }
  }, [appState]);

  const updateFilterOption = (data: any) => {
    setFilterOptions(data);
  };

  return (
    <AppContext.Provider
      value={{ appState, dispatch, filterOptions, updateFilterOption }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
