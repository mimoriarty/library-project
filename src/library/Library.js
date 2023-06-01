import {
  createContext,
  useContext,
  useReducer,
} from 'react';

const Library = createContext();

Library.displayName = 'Library';

export const useLibrary = () => useContext(Library);

export const LibraryProvider = ({ children, initialState, reducer }) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <Library.Provider value={[globalState, dispatch]}>{children}</Library.Provider>
  );
};